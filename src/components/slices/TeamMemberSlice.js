import React, { PureComponent } from 'react'
import injectSheet from 'react-jss'
import Section from '../widgets/Section'
import ResponsiveImage from '../widgets/ResponsiveImage'
import RichTextContainer from '../widgets/RichTextContainer'

class TeamMemberSlice extends PureComponent {
  render () {
    const { classes, slice } = this.props
    if (!slice) return

    return (
      <Section>
        <div className={classes.teamMember}>
          {slice.team_member_image.images && (
            <ResponsiveImage
              images={slice.team_member_image.images}
              className={classes.image}
              aspect={1}
            />
          )}
          <div className={classes.content}>
            <h2 className={classes.title}>{slice.team_member_name.text}</h2>
            <h3 className={classes.position}>{slice.team_member_position}</h3>
          </div>
        </div>
        <RichTextContainer
          className={classes.bio}
          content={slice.team_member_bio.html}
        />
      </Section>
    )
  }
}

export default injectSheet((theme) => ({
  teamMember: {
    display: 'flex',
    alignItems: 'center',
    margin: [0, `-${theme.spacing.xs}`],
    '& > *': {
      margin: [0, theme.spacing.xs]
    },
    [theme.breakpoints.up('md')]: {
      margin: [0, `-${theme.spacing.md}`],
      '& > *': {
        margin: [0, theme.spacing.md]
      }
    }
  },
  image: {
    borderRadius: '50%',
    width: 88,
    height: 88,
    [theme.breakpoints.up('md')]: {
      width: 200,
      height: 200
    }
  },
  content: {
    // flex: '1 0 auto'
    width: '70%'
  },
  title: {
    marginBottom: 0,
    lineHeight: 1.5,
    fontSize: theme.getRemValue(20),
    [theme.breakpoints.up('md')]: {
      fontWeight: 300,
      fontSize: theme.getRemValue(40)
    }
  },
  position: {
    marginBottom: 0,
    lineHeight: 1.5,
    fontWeight: 500,
    fontSize: theme.getRemValue(12),
    [theme.breakpoints.up('md')]: {
      fontSize: theme.getRemValue(20)
    }
  },
  bio: {
    marginTop: theme.spacing.md,
    maxWidth: theme.text.maxWidth,
    [theme.breakpoints.up('md')]: {
      marginTop: `-${theme.spacing.md}`,
      marginLeft: `calc(200px + ${theme.spacing.md} + ${theme.spacing.md})`
    }
  }
}))(TeamMemberSlice)
