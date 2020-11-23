import React, { PureComponent } from 'react'
import injectSheet from 'react-jss'
import { connect } from 'react-redux'
import cn from 'classnames'
import Link from './widgets/Link'
import filter from 'lodash/filter'
import elementResizeDetectorMaker from 'element-resize-detector'
import { fitText } from '../utils/text'

class Dropdowns extends PureComponent {
  componentDidMount () {
    if (this.boundingBox) {
      this.fit()
      this.erd = elementResizeDetectorMaker({ strategy: 'scroll' })
      this.erd.listenTo(this.boundingBox, this.fit)
    }
  }

  componentDidUpdate () {
    this.fit()
  }

  componentWillUnmount () {
    if (this.erd && this.boundingBox) {
      this.erd.removeAllListeners(this.boundingBox)
    }
  }

  fit = () => {
    if (!this.boundingBox || !this.listRef) return
    fitText(this.boundingBox, this.listRef, 8, 16)
  }

  setBoundingBox = (ref) => { this.boundingBox = ref }
  setListRef = (ref) => { this.listRef = ref }

  render () {
    const { classes, tabs, theme = 'dark-theme' } = this.props
    if (!tabs || tabs.length === 0 || Object.keys(tabs[0]).length === 0) return null
    return <nav className={cn(classes.container, theme)}>
      <div className={classes.boundingBox} ref={this.setBoundingBox}>
        <div className={classes.dropdown}>
          <button className={classes.dropbtn}>Dropdown</button>
          <div className={classes.dropdownContent}>
            <a className={classes.test} href='#'>Link 1</a>
            <a className={classes.test} href='#'>Link 2</a>
            <a className={classes.test} href='#'>Link 3</a>
          </div>
        </div>
        <ul className={classes.list} ref={this.setListRef}>
          {filter(tabs, x => x.tab_link).map((tab, i) => <li key={i}>
            <Link className={cn(tab.tab_link.url === 'page/applications-ground-water' && 'selected')} to={tab.tab_link.url} target={tab.tab_link.target}>{tab.tab_title}</Link>
          </li>)}
        </ul>
      </div>
    </nav>
  }
}

const mapStateToProps = (state) => {
}

export default injectSheet(theme => ({

  dropbtn: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '16px',
    fontSize: '16px',
    border: 'none'
  },

  dropdown: {
    position: 'relative',
    display: 'inline-block',
    '&:hover $dropbtn': {
      backgroundColor: '#3e8e41'
    }
  },
  dropdownContent: {
    display: 'none',
    position: 'absolute',
    backgroundColor: '#f1f1f1',
    minWdth: '160px',
    boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
    zIndex: 1,
    '& a': {
      color: 'black',
      padding: '12px 16px',
      textDecoration: 'none',
      display: 'block'
    }
  }
}))(connect(mapStateToProps)(Dropdowns))
