import React, { Component } from 'react'
import injectSheet from 'react-jss'
import { connect } from 'react-redux'
import flow from 'lodash/flow'
import {
  getCurrentBreakpoint,
  getGlobalContent,
  getMenuItems,
  isMenuOpen,
  getPage
} from '../selectors'
import { TweenLite } from 'gsap'
import Link from './widgets/Link'
import elementResizeDetectorMaker from 'element-resize-detector'
import { fitText } from '../utils/text'
import { toggleMenu } from '../actions'
import * as breakpoints from '../styles/breakpoints'
import Symbol from './SVGSymbol'
import house from '../img/icons/house.svg'
import phone from '../img/icons/phone.svg'
import star from '../img/icons/star.svg'
import news from '../img/icons/news.svg'
import tablet from '../img/icons/tablet.svg'
import people from '../img/icons/people.svg'
import award from '../img/icons/award.svg'
import barChat from '../img/icons/barChat.svg'
import handUp from '../img/icons/handUp.svg'

class Menu extends Component {
  state = { iconTag: [] }
  componentDidMount () {
    this.update()
    if (this.boundingBox) {
      this.fit()
      this.erd = elementResizeDetectorMaker({ strategy: 'scroll' })
      this.erd.listenTo(this.boundingBox, this.fit)
    }
  }

  componentDidUpdate () {
    this.update()
  }

  componentWillUnmount () {
    if (this.erd && this.boundingBox) {
      this.erd.removeAllListeners(this.boundingBox)
    }
  }

  onHideMenu = () => {
    const { open } = this.props
    if (!open) return
    const { onHideMenu } = this.props
    onHideMenu()
  }

  fit = () => {
    if (!this.boundingBox || !this.listRef) return
    const { breakpoint } = this.props
    const maxNameFontSize = breakpoint === 'xs' || breakpoint === 'sm' ? 36 : 48
    fitText(this.boundingBox, this.listRef, 24, maxNameFontSize)
  }

  update = () => {
    const { open } = this.props
    TweenLite.to(this.overlayRef, 0.5, { autoAlpha: open ? 0.5 : 0 })
    TweenLite.to(this.ref, 0.5, { y: open ? '0%' : '-100%' })
  }
  setMenuRef = (ref) => {
    this.ref = ref
  }
  setOverlayRef = (ref) => {
    this.overlayRef = ref
  }
  setBoundingBox = (ref) => {
    this.boundingBox = ref
  }
  setListRef = (ref) => {
    this.listRef = ref
  }
  getIconFunc = (ref) => {
    const { house } = this.props

    return house
  }
  render () {
    const { classes, menu, global } = this.props
    console.log(menu)
    return [
      <div
        key='overlay'
        className={classes.overlay}
        ref={this.setOverlayRef}
        onClick={this.onHideMenu}
      />,

      <nav key='menu' className={classes.container} ref={this.setMenuRef}>
        <div className={classes.boundingBox} ref={this.setBoundingBox}>
          <ul className={classes.list} ref={this.setListRef}>
            {menu.map((x, i) => {
              if (x.menu_type === 'button') {
                return (
                  <li key={i}>
                    {
                      <div className={classes.dropdown}>
                        {x.menu_title === 'Home' && (
                          <Link
                            className={classes.dropbtn}
                            to={x.menu_link.url}>
                            <span>
                              <Symbol
                                icon={house}
                                className={classes.chevronDoubleRight}
                              />
                              {x.menu_title}
                            </span>
                          </Link>
                        )}
                        {x.menu_title === 'About Us' && (
                          <Link
                            className={classes.dropbtn}
                            to={x.menu_link.url}>
                            <span>
                              <Symbol
                                icon={star}
                                className={classes.chevronDoubleRight}
                              />
                              {x.menu_title}
                            </span>
                          </Link>
                        )}
                        {x.menu_title === 'Our Technology' && (
                          <Link
                            className={classes.dropbtn}
                            to={x.menu_link.url}>
                            <span>
                              <Symbol
                                icon={handUp}
                                className={classes.chevronDoubleRight}
                              />
                              {x.menu_title}
                            </span>
                          </Link>
                        )}
                        {x.menu_title === 'Our Team' && (
                          <Link
                            className={classes.dropbtn}
                            to={x.menu_link.url}>
                            <span>
                              <Symbol
                                icon={people}
                                className={classes.chevronDoubleRight}
                              />
                              {x.menu_title}
                            </span>
                          </Link>
                        )}
                        {x.menu_title === 'Case Studies' && (
                          <Link
                            className={classes.dropbtn}
                            to={x.menu_link.url}>
                            <span>
                              <Symbol
                                icon={award}
                                className={classes.chevronDoubleRight}
                              />
                              {x.menu_title}
                            </span>
                          </Link>
                        )}
                        {/* {
                          x.menu_title === 'Infinite News' && <Link className={classes.dropbtn} to={x.menu_link.url}><span><Symbol icon={news} className={classes.chevronDoubleRight} />{x.menu_title}</span></Link>
                        } */}
                        {x.menu_title === 'Contact' && (
                          <Link
                            className={classes.dropbtn}
                            to={x.menu_link.url}>
                            <span>
                              <Symbol
                                icon={phone}
                                className={classes.chevronDoubleRight}
                              />
                              {x.menu_title}
                            </span>
                          </Link>
                        )}

                        {x.menu_title === 'Infinite News' && (
                          <div className={classes.dropdown}>
                            <a className={classes.dropbtn}>
                              <span>
                                <Symbol
                                  icon={news}
                                  className={classes.chevronDoubleRight}
                                />
                                Infinite News
                              </span>
                            </a>
                            <div className={classes.dropdownContentInfiniteNews}>
                              <Link
                                className={classes.test}
                                to={'/page/company-news'}>
                                <span>Company News</span>
                              </Link>
                              <Link className={classes.test} to={'/page/blogs'}>
                                <span>Blogs</span>
                              </Link>
                            </div>
                          </div>
                        )}

                        {x.menu_title === '应用' && (
                          <div className={classes.dropdown}>
                            <a className={classes.dropbtn}>
                              <span>
                                <Symbol
                                  icon={news}
                                  className={classes.chevronDoubleRight}
                                />
                                无限新闻
                              </span>
                            </a>
                            <div className={classes.dropdownContent}>
                              <Link
                                className={classes.test}
                                to={'/zh/page/company-news'}>
                                <span>公司新闻</span>
                              </Link>
                              <Link
                                className={classes.test}
                                to={'/zh/page/blogs'}>
                                <span>网志</span>
                              </Link>
                            </div>
                          </div>
                        )}

                        {/* chinese */}
                        {x.menu_title === '主页' && (
                          <Link
                            className={classes.dropbtn}
                            to={x.menu_link.url}>
                            <span>
                              <Symbol
                                icon={house}
                                className={classes.chevronDoubleRight}
                              />
                              {x.menu_title}
                            </span>
                          </Link>
                        )}
                        {x.menu_title === '公司简介' && (
                          <Link
                            className={classes.dropbtn}
                            to={x.menu_link.url}>
                            <span>
                              <Symbol
                                icon={star}
                                className={classes.chevronDoubleRight}
                              />
                              {x.menu_title}
                            </span>
                          </Link>
                        )}
                        {x.menu_title === '我们的技术' && (
                          <Link
                            className={classes.dropbtn}
                            to={x.menu_link.url}>
                            <span>
                              <Symbol
                                icon={handUp}
                                className={classes.chevronDoubleRight}
                              />
                              {x.menu_title}
                            </span>
                          </Link>
                        )}
                        {x.menu_title === '我们的团队' && (
                          <Link
                            className={classes.dropbtn}
                            to={x.menu_link.url}>
                            <span>
                              <Symbol
                                icon={people}
                                className={classes.chevronDoubleRight}
                              />
                              {x.menu_title}
                            </span>
                          </Link>
                        )}
                        {x.menu_title === '应用领域' && (
                          <Link
                            className={classes.dropbtn}
                            to={x.menu_link.url}>
                            <span>
                              <Symbol
                                icon={award}
                                className={classes.chevronDoubleRight}
                              />
                              案例研究
                            </span>
                          </Link>
                        )}
                        {/* {
                          x.menu_title === '应用' && <Link className={classes.dropbtn} to={x.menu_link.url}><span><Symbol icon={news} className={classes.chevronDoubleRight} />无限新闻</span></Link>
                        } */}

                        {x.menu_title === '公司新闻' && (
                          <Link
                            className={classes.dropbtn}
                            to={x.menu_link.url}>
                            <span>
                              <Symbol
                                icon={news}
                                className={classes.chevronDoubleRight}
                              />
                              {x.menu_title}
                            </span>
                          </Link>
                        )}
                        {x.menu_title === '联系我们' && (
                          <Link
                            className={classes.dropbtn}
                            to={x.menu_link.url}>
                            <span>
                              <Symbol
                                icon={phone}
                                className={classes.chevronDoubleRight}
                              />
                              {x.menu_title}
                            </span>
                          </Link>
                        )}

                        {/* {
                          x.menu_title === '应用' && <Link className={classes.dropbtn} to={x.menu_link.url}><span><Symbol icon={tablet} className={classes.chevronDoubleRight} />{x.menu_title}</span></Link>
                        } */}
                        {/* {
                          x.menu_title === '应用领域' && <Link className={classes.dropbtn} to={x.menu_link.url}><span><Symbol icon={barChat} className={classes.chevronDoubleRight} />{x.menu_title}</span></Link>
                        } */}
                        {/* <Link className={classes.dropbtn}  to={x.menu_link.url}><span><Symbol icon={this.getIconFunc('house')} className={classes.chevronDoubleRight} />{ x.menu_title }</span></Link> */}
                      </div>
                    }
                  </li>
                )
              }
              if (x.menu_type === 'dropdown') {
                if (
                  x.menu_title === x.dropdown_parent_title &&
                  x.menu_title === 'Applications'
                ) {
                  return (
                    <li key={i}>
                      {
                        <div className={classes.dropdown}>
                          <Link className={classes.dropbtn} to={'/page/applications-potable-use'}>
                            <span>
                              <Symbol
                                icon={tablet}
                                className={classes.chevronDoubleRight}
                              />
                              Applications
                            </span>
                          </Link>
                          <div className={classes.dropdownContent}>
                            <Link
                              className={classes.test}
                              to={'/page/applications-potable-use'}>
                              <span>Potable Use</span>
                            </Link>
                            <Link
                              className={classes.test}
                              to={'/page/applications-industrial-use'}>
                              <span>Industrial Use</span>
                            </Link>
                            <Link
                              className={classes.test}
                              to={
                                '/page/applications-industrial-wastewater-reuse'
                              }>
                              <span>Industrial Wastewater and Reuse</span>
                            </Link>
                            <Link
                              className={classes.test}
                              to={
                                '/page/applications-sewage-treatment-recycling'
                              }>
                              <span>Sewage Treatment & Recycling</span>
                            </Link>
                            <Link
                              className={classes.test}
                              to={'/page/applications-environment-remediation'}>
                              <span>Environment Remediation</span>
                            </Link>
                          </div>
                        </div>
                      }
                    </li>
                  )
                }
                if (x.menu_title === '案例研究') {
                  return (
                    <li key={i}>
                      {
                        <div className={classes.dropdown}>
                          <a className={classes.dropbtn}>
                            <span>
                              <Symbol
                                icon={tablet}
                                className={classes.chevronDoubleRight}
                              />
                              应用
                            </span>
                          </a>
                          <div className={classes.dropdownContent}>
                            <Link
                              className={classes.test}
                              to={'/zh/page/applications-potable-use'}>
                              <span>地下水</span>
                            </Link>
                            <Link
                              className={classes.test}
                              to={'/zh/page/applications-industrial-use'}>
                              <span>地表水</span>
                            </Link>
                            <Link
                              className={classes.test}
                              to={
                                '/zh/page/applications-industrial-wastewater-reuse'
                              }>
                              <span>加工用水</span>
                            </Link>
                            <Link
                              className={classes.test}
                              to={
                                '/zh/page/applications-sewage-treatment-recycling'
                              }>
                              <span>废水</span>
                            </Link>
                            <Link
                              className={classes.test}
                              to={
                                '/zh/page/applications-environment-remediation'
                              }>
                              <span>环境修复</span>
                            </Link>
                          </div>
                        </div>
                      }
                    </li>
                  )
                }
              }
              if (
                x.menu_title === x.dropdown_parent_title &&
                x.menu_title === 'Industries'
              ) {
                return (
                  <li key={i}>
                    {
                      <div className={classes.dropdown}>
                        <Link className={classes.dropbtn} to={'/page/industries-municipal'}>
                          <Symbol
                            icon={barChat}
                            className={classes.chevronDoubleRight}
                          />
                          Industries
                        </Link>
                        <div className={classes.dropdownContent}>
                          <Link
                            className={classes.test}
                            to={'/page/industries-municipal'}>
                            <span>Municipal</span>
                          </Link>
                          <Link
                            className={classes.test}
                            to={'/page/industries-commercial'}>
                            <span>Commercial</span>
                          </Link>
                          <Link
                            className={classes.test}
                            to={'/page/industries-infrastructure'}>
                            <span>Infrastructure</span>
                          </Link>
                          <Link
                            className={classes.test}
                            to={'/page/industries-mining'}>
                            <span>Mining</span>
                          </Link>
                          <Link
                            className={classes.test}
                            to={'/page/industries-food-beverage'}>
                            <span>Food & Beverage</span>
                          </Link>
                          <Link
                            className={classes.test}
                            to={'/page/industries-printing-packaging'}>
                            <span>Printing & Packaging</span>
                          </Link>
                          <Link
                            className={classes.test}
                            to={'/page/industries-manufacturing'}>
                            <span>Manufacturing</span>
                          </Link>
                        </div>
                      </div>
                    }
                  </li>
                )
              }
              if (x.menu_title === '公司新闻') {
                return (
                  <li key={i}>
                    {
                      <div className={classes.dropdown}>
                        <a className={classes.dropbtn}>
                          <Symbol
                            icon={barChat}
                            className={classes.chevronDoubleRight}
                          />
                          公司新闻
                        </a>
                        <div className={classes.dropdownContent}>
                          <Link
                            className={classes.test}
                            to={'/zh/page/industries-municipal'}>
                            <span>商业机构与组织</span>
                          </Link>
                          {/* <Link className={classes.test} to={'/zh/page/industries-municipal'}><span>商业机构与组织Municipal</span></Link> */}
                          <Link
                            className={classes.test}
                            to={'/zh/page/industries-commercial'}>
                            <span>建设</span>
                          </Link>
                          {/* <Link className={classes.test} to={'/zh/page/industries-commercial'}><span>Commercial</span></Link> */}
                          <Link
                            className={classes.test}
                            to={'/zh/page/industries-infrastructure'}>
                            <span>赈灾与偏远地区</span>
                          </Link>
                          {/* <Link className={classes.test} to={'/zh/page/industries-infrastructure'}><span>Infrastructure</span></Link> */}
                          <Link
                            className={classes.test}
                            to={'/zh/page/industries-mining'}>
                            <span>工业</span>
                          </Link>
                          <Link
                            className={classes.test}
                            to={'/zh/page/industries-food-beverage'}>
                            <span>市政</span>
                          </Link>
                          {/* <Link className={classes.test} to={'/zh/page/industries-food-beverage'}><span>Food & Beverage</span></Link> */}
                          <Link
                            className={classes.test}
                            to={'/zh/page/industries-printing-packaging'}>
                            <span>印刷包装</span>
                          </Link>
                          {/* <Link className={classes.test} to={'/zh/page/industries-printing-packaging'}><span>Printing & Packaging</span></Link> */}
                          <Link
                            className={classes.test}
                            to={'/zh/page/industries-manufacturing'}>
                            <span>制造业</span>
                          </Link>
                          {/* <Link className={classes.test} to={'/zh/page/industries-manufacturing'}><span>Manufacturing</span></Link> */}
                        </div>
                      </div>
                    }
                  </li>
                )
              }
              return <li />
            })}
          </ul>
        </div>
        <div className={classes.footer}>
          {global.phone && <a href={`tel:${global.phone}`}>{global.phone}</a>}
          {global.email && (
            <a href={`mailto:${global.email}`}>{global.email}</a>
          )}
        </div>
      </nav>
    ]
  }
}

const mapStateToProps = (state) => {
  return {
    open: isMenuOpen(state),
    menu: getMenuItems(state),
    global: getGlobalContent(state),
    breakpoint: getCurrentBreakpoint(state),
    page: getPage(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onHideMenu: () => {
      dispatch(toggleMenu())
    }
  }
}

export default flow([
  injectSheet((theme) => ({
    overlay: {
      zIndex: theme.zIndex.menu - 1,
      opacity: 0,
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      width: '100%',
      backgroundColor: 'black',
      visibility: 'hidden'
    },
    container: {
      zIndex: theme.zIndex.menu,
      backgroundColor: theme.colors.dusk,
      position: 'fixed',
      top: 0,
      transform: 'translate(0, -100%)',
      left: 0,
      width: '100%',
      height: '70%',
      alignItems: 'left',
      flexDirection: 'column',
      display: 'block',
      [theme.breakpoints.up('md')]: {
        maxHeight: '272px',
        display: 'flex'
      },
      [theme.breakpoints.down('sm')]: {
        overflowY: 'scroll'
      }
    },
    footer: {
      position: 'absolute',
      top: '70px',
      ...theme.mixin.contentSidePadding(),
      marginTop: theme.spacing.sd,
      marginBottom: theme.spacing.sd,
      flex: '0 0 auto',
      width: '100%',
      textAlign: 'right',
      '& a': {
        textAlign: 'right',
        color: theme.colors.primary,
        fontSize: theme.getRemValue(14),
        fontWeight: 400,
        display: 'block',
        [theme.breakpoints.up('sm')]: {
          display: 'inline',
          margin: [0, theme.spacing.sm]
        }
      },
      [theme.breakpoints.up('sm')]: {
        top: '10px'
      }
    },
    boundingBox: {
      // flex: '1 0 auto',
      width: '100%',
      backgroundColor: '#cfabab',
      // display: 'flex',
      alignItems: 'center',
      position: 'absolute',
      top: '50px',
      margin: ['0', 0, '2.5rem'],
      maxHeight: 'calc(75vh - 4rem - 2.5rem)',
      ...theme.mixin.headerOffset('margin', (value) => [value, 0, '2.5rem']),
      [breakpoints.up('sm')]: {
        maxHeight: 'calc(75vh - 8rem - 2.5rem)',
        margin: ['4.5rem', 0, '2.5rem']
      },
      [breakpoints.up('md')]: {
        maxHeight: 'calc(75vh - (9.5rem + 2.5rem))',
        margin: ['5.5rem', 0, '0.5rem']
      }
    },
    list: {
      position: 'absolute',
      marginLeft: '20%',
      marginRight: '0%',
      width: '80%',
      flex: '1 0 auto',
      listStyle: 'none',
      padding: 0,
      // display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      '& > li': {
        float: 'left',
        paddingBottom: '10px',
        width: '30%',
        [theme.breakpoints.down('sm')]: {
          width: 'auto',
          float: 'inherit',
          textAlign: 'left'
        }
      },
      fontSize: '3.00rem',
      fontWeight: 300,
      [theme.breakpoints.up('md')]: {
        fontSize: theme.getRemValue(48)
      },
      zIndex: '100'
    },
    link: {
      display: 'block',
      float: 'left',
      position: 'relative',
      fontWeight: 'inherit',
      '&:hover $pattern': {
        opacity: 0.16
      },
      '&:hover $menuText': {
        opacity: 1
      }
    },
    menuText: {
      padding: '14px 20px',
      textAlign: 'center',
      position: 'relative',
      transition: 'opacity 0.25s ease-in-out',
      opacity: 0.6,
      width: '100%',
      maxWidth: 1200,
      margin: 'auto'
    },
    pattern: {
      opacity: 0,
      display: 'flex',
      position: 'absolute',
      height: '2.2em',
      top: '-0.5em',
      left: 0,
      right: 0,
      pointerEvents: 'none',
      transition: 'opacity 0.25s ease-in-out'
    },
    dropbtn: {
      cursor: 'pointer',
      fontWeight: '100',
      border: 'none',
      paddingBottom: '10px',
      fontSize: 'inherit',
      borderRadius: 0,
      opacity: 0.6,
      '&:hover': {
        opacity: 1,
        color: '#4d4e56'
      },
      '&:hover $arrow': {
        transform: 'translate(15px, 0)',
        display: 'visible'
      }
    },
    arrow: {
      display: 'invisible',
      transition: 'transform 0.5s ease-in-out'
    },
    dropdownContent: {
      padding: '10px 40px',
      marginTop: '4px',
      color: '#4d4e56',
      textAlign: 'left',
      display: 'none',
      position: 'absolute',
      border: 'none',
      minWidth: '200px',
      backgroundColor: '#cfabab',
      boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
      zIndex: 1,
      '& a': {
        fontWeight: '100',
        opacity: 0.6,
        fontSize: 'inherit',
        textDecoration: 'none',
        display: 'block',
        transition: ' all 0.5s',
        '&:hover': {
          opacity: 1,
          color: '#4d4e56'
        },
        '& span': {
          cursor: 'pointer',
          display: 'inline-block',
          position: 'relative',
          transition: '0.5s',
          '&:hover': {
            opacity: 1,
            color: '#4d4e56',
            paddingLeft: '25px',
            '& after': {
              opacity: '1',
              right: '0'
            }
          }
        }
      },
      [theme.breakpoints.down('md')]: {
        // position: 'relative !important',
        display: 'none !important',
        height: 'auto'
      }
    },
    dropdownContentInfiniteNews: {
      padding: '10px 40px',
      marginTop: '4px',
      color: '#4d4e56',
      textAlign: 'left',
      display: 'none',
      position: 'absolute',
      border: 'none',
      minWidth: '200px',
      backgroundColor: '#cfabab',
      boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
      zIndex: 1,
      '& a': {
        fontWeight: '100',
        opacity: 0.6,
        fontSize: 'inherit',
        textDecoration: 'none',
        display: 'block',
        transition: ' all 0.5s',
        '&:hover': {
          opacity: 1,
          color: '#4d4e56'
        },
        '& span': {
          cursor: 'pointer',
          display: 'inline-block',
          position: 'relative',
          transition: '0.5s',
          '&:hover': {
            opacity: 1,
            color: '#4d4e56',
            paddingLeft: '25px',
            '& after': {
              opacity: '1',
              right: '0'
            }
          }
        }
      },
      [theme.breakpoints.down('md')]: {
        position: 'relative !important',
        // display: 'none !important',
        height: 'auto'
      }
    },

    dropdown: {
      textAlign: 'left',
      '&:hover $dropdownContent': { display: 'block' },
      [theme.breakpoints.down('lg')]: {
        textAlign: 'left'
      }
    },
    dropdown: {
      textAlign: 'left',
      '&:hover $dropdownContentInfiniteNews': { display: 'block' },
      [theme.breakpoints.down('lg')]: {
        textAlign: 'left'
      }
    },
    navbar: {
      overflow: 'hidden',
      backgroundColor: '#333'
    },
    chevronDoubleRight: {
      position: 'relative',
      marginTop: -4,
      width: 30,
      height: 20,
      [theme.breakpoints.up('sm')]: {
        marginTop: -8
        // width: 60,
        // height: 40
      }
    }
  })),
  connect(mapStateToProps, mapDispatchToProps)
])(Menu)
