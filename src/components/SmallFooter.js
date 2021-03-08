import React, {Component} from 'react'
import {connect} from 'react-redux'
import cn from 'classnames'
import injectSheet from 'react-jss'
import {getGlobalContent} from '../selectors'
import flow from 'lodash/flow'
// import Link from './widgets/Link'

class Modal extends React.Component {
  constructor (props) {
    super(props)

    this.outerStyle = {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      overflow: 'auto',
      zIndex: 1
    }

    // default style
    this.style = {
      modal: {
        position: 'relative',
        width: 500,
        padding: 20,
        boxSizing: 'border-box',
        backgroundColor: '#36454f',
        top: '17%',
        margin: '40px auto',
        borderRadius: 3,
        zIndex: 2,
        textAlign: 'left',
        boxShadow: '0 20px 30px rgba(0, 0, 0, 0.2)',
        ...this.props.style.modal
      },
      overlay: {
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        ...this.props.style.overlay
        // cursor: 'pointer'
      }
    }
  }

  // render modal
  render () {
    return (
      <div
        style={{
          ...this.outerStyle,
          display: this.props.isModalOpen ? 'block' : 'none'
        }}
      >
        <div style={this.style.overlay} onClick={this.props.closeModal} />
        <div onClick={this.props.closeModal} />
        <div style={this.style.modal}>{this.props.children}</div>
      </div>
    )
  }
}

// overwrite style
const modalStyle = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0,0.5)'
  }
}

const mainStyle = {
  app: {
    margin: '120px 0'
  },
  button: {
    backgroundColor: '#F5E5DA',
    border: 0,
    padding: '12px 20px',
    color: 'black',
    margin: '0 auto',
    width: 150,
    display: 'block',
    borderRadius: 3
  }
}

class SmallFooter extends Component {
  constructor (props) {
    super(props)

    // set initial state
    this.state = {
      isModalOpen: false,
      isInnerModalOpen: false
    }

    // bind functions
    this.closeModal = this.closeModal.bind(this)
    this.openModal = this.openModal.bind(this)
  }
  // close modal (set isModalOpen, true)
  closeModal () {
    this.setState({
      isModalOpen: false
    })
  }

  // open modal (set isModalOpen, false)
  openModal () {
    this.setState({
      isModalOpen: true
    })
  }

  componentDidMount () {
    var script = document.createElement('script')
    script.src = 'https://js.hsforms.net/forms/v2.js'
    document.body.appendChild(script)

    script.addEventListener('load', () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId: '4527957',
          formId: 'b5c3a785-e621-4cd8-91d8-059b046babd0',
          target: '#hubspotForm1'
        })
      }
    })
  }
  render () {
    const {classes, theme, global} = this.props

    if (!global) return null
    return <footer className={cn(classes.footer, theme === 'dark' && 'dark-theme')}>
      <div className={classes.footerContainer}>
        {global.contact_us_link && <div>
          <button style={{backgroundColor: 'transparent', border: 'none', outline: 'none', width: '210px', cursor: 'pointer'}} onClick={this.openModal} to={global.contact_us_link.url} target={global.contact_us_link.target}>{global.contact_us_text}</button>
        </div>
        }

        <div style={{paddingLeft: '8%'}}>
          {/* <button style={{backgroundColor: 'transparent', border: 'none', outline: 'none', color: 'white', width: '130px', cursor: 'pointer'}} onClick={this.openModal} className={classes.callAction}> call to action </button> */}
          <Modal
            isModalOpen={this.state.isModalOpen}
            closeModal={this.closeModal}
            style={modalStyle}
          >
            <div id='hubspotForm1' />

            <button
              style={{
                ...mainStyle.button,
                margin: 0,
                width: 'auto',
                marginTop: 10,
                cursor: 'pointer'
              }}
              onClick={this.closeModal}
            >
              Close
            </button>
          </Modal>
        </div>

        <div className={classes.container}>
          {global.phone && <a href={`tel:${global.phone}`}>{global.phone}</a>}
          {global.email && <a href={`mailto:${global.email}`}>{global.email}</a>}
        </div>
      </div>
    </footer>
  }
}

const mapStateToProps = (state) => {
  return {
    global: getGlobalContent(state)
  }
}

export default flow([
  injectSheet(theme => ({
    footer: {
      color: theme.colors.skin,
      backgroundColor: theme.colors.skin,
      fontSize: theme.getRemValue(16),
      position: 'relative',
      overflow: 'hidden',
      paddingTop: '1.5rem',
      paddingBottom: '1.5rem',
      [theme.breakpoints.up('md')]: {
        paddingTop: '3rem',
        paddingBottom: '3rem'
      },
      '&.dark-theme': {
        backgroundColor: theme.colors.primary
      },
      '& a': {
        color: theme.colors.primary,
        fontSize: theme.getRemValue(12),
        fontWeight: 400,
        [theme.breakpoints.up('sm')]: {
          fontSize: theme.getRemValue(14)
        }
      },
      '&.dark-theme a': {
        color: theme.colors.skin
      },
      '& button': {
        color: theme.colors.primary,
        fontSize: theme.getRemValue(12),
        fontWeight: 400,
        [theme.breakpoints.up('sm')]: {
          fontSize: theme.getRemValue(14)
        }
      },
      '&.dark-theme button': {
        color: theme.colors.skin
      }
    },
    footerContainer: {
      ...theme.mixin.contentContainer(),
      justifyContent: 'space-between',
      alignItems: 'center',
      display: 'flex'
    },
    linkContainer: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'block'
      },
      '& a': {
        fontWeight: 700
      }
    },
    callAction: {
      paddingLeft: '8%',
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex'
      }
    },
    container: {
      flex: '1 0 auto',
      margin: [theme.spacing.sm, `-${theme.spacing.xs}`],
      '& > *': {
        margin: [0, theme.spacing.xs]
      },
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      [theme.breakpoints.up('sm')]: {
        justifyContent: 'flex-end',
        margin: [theme.spacing.md, `-${theme.spacing.md}`],
        '& > *': {
          margin: [0, theme.spacing.md]
        }
      }
    }
  })),
  connect(mapStateToProps)
])(SmallFooter)
