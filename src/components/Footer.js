import React, {Component} from 'react'
import {connect} from 'react-redux'
import injectSheet from 'react-jss'
import cn from 'classnames'
import {subscribe} from '../actions'
import {
  getGlobalContent, getHomepageSectionDestination, getHomepageSectionOrigin, getHomepageSectionState,
  getSubscriptionMessage,
  getSubscriptionStatus
} from '../selectors'
import flow from 'lodash/flow'
import RichTextContainer from './widgets/RichTextContainer'
import SVGSymbol from './SVGSymbol'
import arrow from '../img/icons/arrow.svg'
import Spinner from './widgets/Spinner'
import WavePattern from './WavePattern'

class Footer extends Component {
  state = { email: '' }

  onSubmit = (e) => {
    e.preventDefault()
    const {subscribe, status} = this.props
    if (status === 'loading') return

    subscribe(this.state.email)
  }

  onEmailChanged = (event) => {
    this.setState({email: event.target.value})
  }

  render () {
    const {classes, className, global, status, message} = this.props
    const errorMessage = status !== 'success' && message

    if (!global) return null
    return <div className={cn(classes.outer, className)}>
      <div className={classes.patternContainer}>
        <WavePattern />
      </div>
      <div className={classes.container}>
        <div className={classes.content}>
          <h2 className={classes.title}>{global.footer_title.text}</h2>
          <div className={classes.newsletterContainer}>
            {status !== 'success' && [
              <RichTextContainer key='copy' className={classes.copy} content={global.newsletter_copy.html} />,
              <form key='form' className={classes.inputContainer} onSubmit={this.onSubmit}>
                <input type='email' className={classes.input} placeholder={global.newsletter_placeholder} onChange={this.onEmailChanged} required />
                <div className={classes.buttonContainer}>
                  {(status === 'idle' || status === 'error') &&
                  <button className={classes.button} type='submit'>
                    <SVGSymbol icon={arrow} />
                  </button>
                  }
                  {status === 'loading' && <Spinner />}
                </div>
              </form>,
              errorMessage && <div key='errorMessage' className={classes.errorMessage}>{errorMessage}</div>
            ]}
            {status === 'success' && <RichTextContainer className={classes.successCopy} content={global.newsletter_success_message.html} />}
          </div>
          <div className={classes.contactContainer}>
            {global.phone && <a href={`tel:${global.phone}`}>{global.phone}</a>}
            {global.email && <a href={`mailto:${global.email}`}>{global.email}</a>}
          </div>
        </div>
      </div>
    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    global: getGlobalContent(state),
    status: getSubscriptionStatus(state),
    message: getSubscriptionMessage(state),
    destination: getHomepageSectionDestination(state),
    origin: getHomepageSectionOrigin(state),
    transitionState: getHomepageSectionState(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    subscribe: (email) => dispatch(subscribe(email))
  }
}

export default flow([
  injectSheet(theme => ({
    outer: {
      ...theme.mixin.expandAbsolutely(),
      backgroundColor: theme.colors.background,
      minHeight: '75vh',
      display: 'flex'
    },
    container: {
      ...theme.mixin.contentContainer(),
      color: theme.colors.skin,
      textAlign: 'left',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: theme.getRemValue(16),
      position: 'relative'
    },
    content: {
      width: '100%',
      display: 'block',
      alignItems: 'center',
      paddingRight: '1.5rem'
    },
    title: {
      flex: '1 0 auto',
      maxWidth: 500,
      fontSize: theme.getRemValue(36),
      marginBottom: theme.spacing.lg,
      [theme.breakpoints.up('md')]: {
        fontSize: theme.getRemValue(48)
      }
    },
    newsletterContainer: {
      flex: '1 0 auto',
      maxWidth: 500
    },
    copy: {
      '& p:last-child': {
        margin: 0
      }
    },
    successCopy: {
      textAlign: 'left',
      '& p:last-child': {
        margin: 0
      }
    },
    inputContainer: {
      position: 'relative'
    },
    input: {
      width: '100%',
      borderRadius: 0,
      appearance: 'none',
      outline: 'none',
      color: theme.colors.skin,
      padding: [theme.spacing.sm, 60, theme.spacing.sm, 0], // 50 is the svg width
      background: 'none',
      border: 'none',
      borderBottom: `1px solid ${theme.colors.skin}`
    },
    buttonContainer: {
      position: 'absolute',
      right: 0,
      top: '50%',
      transform: 'translate(0, -50%)'
    },
    button: {
      outline: 'inherit',
      borderRadius: 0,
      appearance: 'none',
      transform: 'translate(0, 0)',
      cursor: 'pointer',
      color: 'inherit',
      background: 'none',
      border: 'none',
      transition: 'transform 0.15s ease-in-out',
      '&:hover': {
        transform: 'translate(5px, 0)'
      }
    },
    contactContainer: {
      margin: [theme.spacingPx.md, 0],
      maxWidth: 500,
      '& a': {
        color: theme.colors.skin,
        fontSize: theme.getRemValue(14),
        fontWeight: 300,
        display: 'block',
        [theme.breakpoints.up('sm')]: {
          marginRight: theme.spacing.sm,
          display: 'inline'
        }
      }
    },
    errorMessage: {
      color: theme.colors.dusk,
      marginTop: theme.spacing.sm
    },
    patternContainer: {
      position: 'absolute',
      overflow: 'hidden',
      bottom: 0,
      left: 0,
      right: 0,
      color: theme.colors.skin,
      opacity: 0.2,
      transform: 'translate(0, 32%)',
      '& svg': {
        width: '150%',
        height: '150%',
        [theme.breakpoints.up('sm')]: {
          width: '100%',
          height: '100%'
        }
      }
    }
  })),
  connect(mapStateToProps, mapDispatchToProps)
])(Footer)
