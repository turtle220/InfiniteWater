import React from 'react'
import flow from 'lodash/flow'
import injectSheet from 'react-jss'
import {connect} from 'react-redux'

import {getGlobalContent} from '../selectors'
import './NewFooter.css'
import logo from '../img/icons/logo.svg'
import youtube from '../img/icons/youtube.svg'
import facebook from '../img/icons/facebook.svg'
import linkedin from '../img/icons/linkedin.svg'
import QualityCertified from '../img/icons/QualityCertified.png'
import Safety from '../img/icons/Safety.png'

import Symbol from './SVGSymbol'

class NewFooter extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectURL: ''
    }
  }

  componentDidMount () {
    const ch =
    typeof window !== 'undefined' && window.location.href.split('/')[3]

    if (ch === 'zh') {
      this.setState({
        selectURL:
          typeof window !== 'undefined' && window.location.href.split('/')[5]
      })
    } else {
      this.setState({
        selectURL:
          typeof window !== 'undefined' && window.location.href.split('/')[4]
      })
    }

    var script = document.createElement('script')
    script.src = 'https://js.hsforms.net/forms/v2.js'
    document.body.appendChild(script)

    script.addEventListener('load', () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId: '4527957',
          formId: 'b5c3a785-e621-4cd8-91d8-059b046babd0',
          target: '#hubspotForm2'
        })
      }
    })
  }

  // render modal
  render () {
    const {global} = this.props

    if (!global) return null

    return (
      <footer id='footer' className='dark'>
        <div className='container'>
          <div className='footer-widgets-wrap'>
            <div className='row col-mb-50' style={{paddingLeft: '5%', paddingRight: '5%'}}>
              <div className='col-md-6 col-lg-4'>
                <div className='widget clearfix'>
                  <div style={{display: 'flex'}}>
                    <Symbol icon={logo} className='footer-logo' style={{width: '90px', height: '100px', color: '#F5E5DA'}} />
                    <div style={{paddingTop: '10%', paddingLeft: '5%'}}>
                      <p style={{color: '#F5E5DA'}}>Infinitewater</p>
                    </div>
                  </div>
                  <p style={{color: '#F5E5DA', marginTop: '-9%'}}>
                    Water & Wastewater Treatment Solutions
                  </p>
                  <div className='' style={{paddingBottom: '5%'}}>
                    <a href='https://www.linkedin.com/company/infinitewater' >
                      <Symbol icon={linkedin} style={{width: '50px', height: '30px', color: '#F5E5DA'}} />
                    </a>
                    <a href='https://www.facebook.com/Infinite-Water-101075748459633' style={{paddingLeft: '5%'}}>
                      <Symbol icon={facebook} style={{width: '50px', height: '30px', color: '#F5E5DA'}} />
                    </a>
                    <a href='https://www.youtube.com/channel/UCGGVWOijY6cv8v_neOpG6oQ' style={{paddingLeft: '5%'}}>
                      <Symbol icon={youtube} style={{width: '50px', height: '30px', color: '#F5E5DA'}} />
                    </a>
                  </div>
                  <div style={{backgroundSize: '100%', color: '#F5E5DA'}}>
                    <abbr style={{color: '#F5E5DA'}}>Phone:  {''}</abbr>
                    {global.phone && <a style={{color: '#F5E5DA', fontWeight: 500}} href={`tel:${global.phone}`}>{global.phone}</a>}
                    <br />
                    <abbr style={{color: '#F5E5DA'}}>Email:  {''}</abbr>
                    {global.email && <a style={{color: '#F5E5DA', fontWeight: 500}} href={`mailto:${global.email}`}>{global.email}</a>}
                  </div>
                  <div style={{display: 'flex', width: '45%', justifyContent: 'space-between', paddingTop: '5%'}}>
                    <img src={QualityCertified} style={{height: '70px', width: '70px', marginTop: '5%'}} />
                    <img src={Safety} style={{height: '70px', width: '70px', marginTop: '5%'}} />
                  </div>
                </div>
              </div>
              <div className='col-md-6 col-lg-4' style={{paddingLeft: '4%'}} >
                <div className='widget clearfix'>
                  <div style={{color: '#F5E5DA'}}>
                    <p style={{paddingTop: '10%', color: '#F5E5DA'}}>INDUSTRIES WE SERVICE</p>
                  </div>
                  <ul style={{display: 'block'}} className='municipal'>
                    <li>
                      <a style={{fontWeight: 100, fontSize: '13px', color: '#F5E5DA'}} href='/page/industries-municipal'> Municipal </a>
                    </li>
                    <li>
                      <a style={{fontWeight: 100, fontSize: '13px', color: '#F5E5DA'}} href='/page/industries-commercial'> Commercial </a>
                    </li>
                    <li>
                      <a style={{fontWeight: 100, fontSize: '13px', color: '#F5E5DA'}} href='/page/industries-infrastructure'> Infrastructure </a>
                    </li>
                    <li>
                      <a style={{fontWeight: 100, fontSize: '13px', color: '#F5E5DA'}} href='/page/industries-mining'> Mining </a>
                    </li>
                    <li>
                      <a style={{fontWeight: 100, fontSize: '13px', color: '#F5E5DA'}} href='/page/industries-food-beverage'> Food & Beverage </a>
                    </li>
                    <li>
                      <a style={{fontWeight: 100, fontSize: '13px', color: '#F5E5DA'}} href='/page/industries-printing-packaging'> Printing & Packaging </a>
                    </li>
                    <li>
                      <a style={{fontWeight: 100, fontSize: '13px', color: '#F5E5DA'}} href='/page/industries-manufacturing'> Manufacturing </a>
                    </li>
                  </ul>
                  <div style={{color: 'white'}} >
                    <p style={{paddingTop: '12%', color: '#F5E5DA'}}>OUR APPLICATIONS</p>
                  </div>
                  <ul style={{display: 'block'}} className='municipal'>
                    <li>
                      <a style={{fontWeight: 100, fontSize: '13px', color: '#F5E5DA'}} href='/page/applications-potable-use'> Potable Use </a>
                    </li>
                    <li>
                      <a style={{fontWeight: 100, fontSize: '13px', color: '#F5E5DA'}} href='/page/applications-industrial-use'> Industrial Use </a>
                    </li>
                    <li>
                      <a style={{fontWeight: 100, fontSize: '13px', color: '#F5E5DA'}} href='/page/applications-industrial-wastewater-reuse'> Industrial Wastewater & Reuse </a>
                    </li>
                    <li>
                      <a style={{fontWeight: 100, fontSize: '13px', color: '#F5E5DA'}} href='/page/applications-sewage-treatment-recycling'> Sewage Treatment & Recycling </a>
                    </li>
                    <li>
                      <a style={{fontWeight: 100, fontSize: '13px', color: '#F5E5DA'}} href='/page/applications-environmental-remediation'> Environmental Remediation </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='col-md-6 col-lg-4'>
                <div className='widget clearfix'>
                  <p style={{paddingTop: '9%', color: '#F5E5DA'}}>HOW CAN WE HELP YOU? </p>
                  <div id='hubspotForm2' />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id='copyrights'>
          <div className='row justify-content-between' style={{justifyContent: 'center'}}>
            <div className='col-12 col-lg-auto text-center text-lg-left copy-letter' style={{display: 'flex'}}>
              <div className='copy_left'>
                <p style={{paddingTop: '4%', color: '#F5E5DA'}}>Copyright © 2021 Infinitewater Holdings Limited - </p>
              </div>
              <div className='copy_right' style={{paddingTop: '3%'}}>
                <a style={{color: '#F5E5DA', fontWeight: '500', cursor: 'pointer', fontSize: '13px'}} href='/page/private-policy'>Privacy Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    global: getGlobalContent(state)
  }
}
export default flow([
  injectSheet(theme => ({

  })),
  connect(mapStateToProps)
])(NewFooter)
