#!/usr/bin/env bash

cd `dirname $0`

SLACK_WEBHOOK_URL=https://hooks.slack.com/services/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
SLACK_CHANNEL="#proj-infinitewater"

function push() {
    yarn install && yarn build

    if [ $? -gt 0 ]; then
        echo 'Client build failed'
        exit 1
    fi

    set -x

    ssh-keyscan ${REMOTE_HOST_DN} >> ~/.ssh/known_hosts

    ESCAPED_REMOTE_PATH=$(printf %q "${REMOTE_PATH}")
    cp ./.ssh/nightjar /root/.ssh/nightjar
    chmod 700 /root/.ssh/nightjar

    rsync -avzO -e "ssh -i /root/.ssh/nightjar" \
        --no-perms --delete --exclude=.env*.local --exclude=.git --exclude=.idea --exclude .DS_Store \
        --exclude .ssh --exclude .docker \
        --include=build/ --include=build/** \
        --include=config/ --include=config/** \
        --include=scripts/ --include=scripts/** \
        --include=package.json --include=yarn.lock \
        --exclude=* ./ "ubuntu@${REMOTE_HOST_DN}:${ESCAPED_REMOTE_PATH}"

    ssh -i /root/.ssh/nightjar ubuntu@${REMOTE_HOST_DN} "cd ${REMOTE_PATH} && yarn install --prod"
    ssh -i /root/.ssh/nightjar ubuntu@${REMOTE_HOST_DN} "redis-cli flushall && pm2 restart start"

    set +x
}

if [ -n $1 ] && [ "$1" = "production" ]; then
    REMOTE_HOST_DN=
    REMOTE_URL=
    REMOTE_PATH="/var/www/infinite/"
    push

else # staging
    REMOTE_HOST_DN=ec2-13-238-97-145.ap-southeast-2.compute.amazonaws.com
    REMOTE_URL=http://ec2-13-238-97-145.ap-southeast-2.compute.amazonaws.com/
    REMOTE_PATH="/var/www/infinite/"
    push
fi

if [ $? -gt 0 ]; then
    echo 'deployment failed'
else
    COMMIT_SHORT="$(git rev-parse --short HEAD)"
    REPO_URL="https://github.com/Nightjar-co/infinitewater/commit/$(git rev-parse HEAD)"
    curl -X POST --data-urlencode 'payload={"channel": "'${SLACK_CHANNEL}'", "text": "Deployed commit <'${REPO_URL}'|'${COMMIT_SHORT}'> to '${REMOTE_URL}'"}' ${SLACK_WEBHOOK_URL}
    echo "Deployed commit ${COMMIT_SHORT} to ${REMOTE_URL}"
fi
