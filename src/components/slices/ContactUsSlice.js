import React, {PureComponent} from 'react'
import injectSheet from 'react-jss'
import {connect} from 'react-redux'
import Section from '../widgets/Section'
import RichTextContainer from '../widgets/RichTextContainer'
import Symbol from '../SVGSymbol'
import arrow from '../../img/icons/arrow.svg'
import cn from 'classnames'
import {submitContact} from '../../actions'
import {getContactStatus, getContactMessage} from '../../selectors'
import Spinner from '../widgets/Spinner'

class ContactUsSlice extends PureComponent {
  state = {
    name: '',
    email: '',
    message: ''
  }

  onSubmit = (e) => {
    const {status} = this.props
    if (status === 'loading') return
    this.props.handleSubmit(this.state)
    e.preventDefault()
  }

  onChanged = (name) => (e) => {
    this.setState({[name]: e.target.value})
  }

  render () {
    const {classes, slice, page, status} = this.props
    const {name, email, message} = this.state
    if (!slice) return

    return <Section className={classes.section}>
      <div>
        <div className={classes.title}>
          <h1>{page.title.text}</h1>
          {slice.text && slice.text.html && <RichTextContainer content={slice.text.html} />}
        </div>
        {status !== 'success' &&
        <form className={classes.form} onSubmit={this.onSubmit}>
          <input name='name' type='text' required className={classes.input} placeholder={slice.name_field_placeholder} onChange={this.onChanged('name')} value={name} />
          <input name='email' type='email' required className={classes.input} placeholder={slice.email_field_placeholder} onChange={this.onChanged('email')} value={email} />
          <textarea name='message' required className={cn(classes.input, classes.textarea)} rows={8} placeholder={slice.message_field_placeholder} onChange={this.onChanged('message')} value={message} />
          <button className={classes.button} type='submit'>
            {slice.cta_text}
            {status === 'loading' ? <Spinner className={classes.spinner} /> : <Symbol icon={arrow} className={classes.arrow} />}
          </button>
        </form>}
        {status === 'success' && <RichTextContainer className={classes.form} content={slice.successful_message.html} />}
      </div>
      <div className={classes.contactInfoContainer}>
        {slice.items.map((item, i) => <RichTextContainer className={classes.contactInfo} key={i} content={item.contact_details.html} />)}
      </div>
    </Section>
  }
}

const mapStateToProps = (state) => {
  return {
    status: getContactStatus(state),
    message: getContactMessage(state)
  }
}

const mapDisptachToProps = (disptach) => {
  return {
    handleSubmit: (data) => { disptach(submitContact(data)) }
  }
}

const MAX_WIDTH = 500

export default injectSheet(theme => ({
  section: {
    '& a': {
      color: theme.colors.skin,
      fontWeight: 400
    },
    display: 'block',
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
      '& > *': {
        flex: '1 0 auto'
      }
    }
  },
  title: {
    maxWidth: MAX_WIDTH
  },
  form: {
    maxWidth: MAX_WIDTH,
    marginBottom: theme.spacing.lg,
    [theme.breakpoints.up('lg')]: {
      margin: [theme.spacing.md, '6rem', theme.spacing.md, 0]
    }
  },
  input: {
    display: 'block',
    color: theme.colors.skin,
    width: '100%',
    marginBottom: theme.spacing.md,
    appearance: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: `1px ${theme.colors.skin} solid`,
    padding: [theme.spacing.sm, theme.spacing.sm]
  },
  textarea: {
    marginTop: theme.spacing.lg, // does not look right because of the border
    border: `1px ${theme.colors.skin} solid`
  },
  contactInfoContainer: {
    display: 'block',
    flexWrap: 'wrap',
    flexShrink: 1,
    [theme.breakpoints.up('sm')]: {
      margin: [0, `-${theme.spacing.md}`],
      display: 'flex',
      '& > div': {
        maxWidth: 250,
        fontSize: theme.getRemValue(14),
        margin: theme.spacing.md,
        width: `calc(50% - (${theme.spacing.md}*2))`
      }
    },
    [theme.breakpoints.up('lg')]: {
      justifyContent: 'space-around'
    }
  },
  contactInfo: {
  },
  button: {
    cursor: 'pointer',
    fontWeight: 'bold',
    color: theme.colors.skin,
    background: 'none',
    border: 'none',
    borderRadius: 0,
    display: 'block',
    '&:hover $arrow': {
      transform: 'translate(5px, 0)'
    }
  },
  arrow: {
    marginLeft: theme.spacing.sm,
    transition: 'transform 0.1s ease-in-out'
  },
  spinner: {
    marginLeft: theme.spacing.sm
  }
}))(connect(mapStateToProps, mapDisptachToProps)(ContactUsSlice))
