import React, { PureComponent } from 'react'
import injectSheet from 'react-jss'
import RichTextContainer from '../widgets/RichTextContainer'
import Section from '../widgets/Section'
import cn from 'classnames'
import CTA from '../widgets/CTA'
import get from 'lodash/get'
import FloatingImages from '../FloatingImages'
import fetch from 'isomorphic-fetch'

class RichTextSlice extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      municipal: [],
      arsenicGroundwater: [],
      glyphosateRemoval: [],
      tableIndustrial: [],
      multiplexConstruction: [],
      peoplesLiberation: [],
      treatmentGroundwater: [],
      manufacturingWastewater: [],
      manufacturingIndustry: [],
      miningWash: [],
      metalloids: [],
      glyphosateRemovaltable2: [],
      hydrox: [],
      selectTable: '',
      selectURL: ''
    }
  }

  componentDidMount () {
    fetch(
      'https://api.airtable.com/v0/appSiM4BMjfa2tOwy/municipal?api_key=keySWJROaGROOvXyK&view=Grid%20view'
    )
      .then((resp) => resp.json())
      .then((data) => {
        console.log('----data:', data)
        this.setState({ municipal: data.records })
      })

    fetch(
      'https://api.airtable.com/v0/appSiM4BMjfa2tOwy/arsenic-groundwater?api_key=keySWJROaGROOvXyK&view=Grid%20view'
    )
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({ arsenicGroundwater: data.records })
      })

    fetch(
      'https://api.airtable.com/v0/appSiM4BMjfa2tOwy/glyphosate-removal?api_key=keySWJROaGROOvXyK&view=Grid%20view'
    )
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({ glyphosateRemoval: data.records })
      })

    fetch(
      'https://api.airtable.com/v0/appSiM4BMjfa2tOwy/glyphosate-removal-1?api_key=keySWJROaGROOvXyK&view=Grid%20view'
    )
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({ glyphosateRemovaltable2: data.records })
      })

    fetch(
      'https://api.airtable.com/v0/appSiM4BMjfa2tOwy/table-industrial?api_key=keySWJROaGROOvXyK&view=Grid%20view'
    )
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({ tableIndustrial: data.records })
      })

    fetch(
      'https://api.airtable.com/v0/appSiM4BMjfa2tOwy/multiplex-construction?api_key=keySWJROaGROOvXyK&view=Grid%20view'
    )
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({ multiplexConstruction: data.records })
      })

    fetch(
      'https://api.airtable.com/v0/appSiM4BMjfa2tOwy/peoples-liberation?api_key=keySWJROaGROOvXyK&view=Grid%20view'
    )
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({ peoplesLiberation: data.records })
      })

    fetch(
      'https://api.airtable.com/v0/appSiM4BMjfa2tOwy/treatment-groundwater?api_key=keySWJROaGROOvXyK&view=Grid%20view'
    )
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({ treatmentGroundwater: data.records })
      })

    fetch(
      'https://api.airtable.com/v0/appSiM4BMjfa2tOwy/manufacturing-wastewater?api_key=keySWJROaGROOvXyK&view=Grid%20view'
    )
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({ manufacturingWastewater: data.records })
      })

    fetch(
      'https://api.airtable.com/v0/appSiM4BMjfa2tOwy/manufacturing-industry?api_key=keySWJROaGROOvXyK&view=Grid%20view'
    )
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({ manufacturingIndustry: data.records })
      })

    fetch(
      'https://api.airtable.com/v0/appSiM4BMjfa2tOwy/mining-wash?api_key=keySWJROaGROOvXyK&view=Grid%20view'
    )
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({ miningWash: data.records })
      })

    fetch(
      'https://api.airtable.com/v0/appSiM4BMjfa2tOwy/metalloids?api_key=keySWJROaGROOvXyK&view=Grid%20view'
    )
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({ metalloids: data.records })
      })

    // Hydrox imported excel data
    fetch(
      'https://api.airtable.com/v0/app3JNKz8kVbrJs9D/Hydrox?api_key=keySWJROaGROOvXyK&view=Grid%20view'
    )
      .then((resp) => resp.json())
      .then((data) => {
        // console.log('----Hydrox----000000:', data)
        this.setState({ hydrox: data.records })
      })
  }

  render () {
    const { classes, className, slice } = this.props
    const fullWidth = slice.columns === 'Full Width'
    const splitIntoColumn = slice.columns === '2'
    console.log(slice, this.state.selectURL, '----------slice:')

    const hasImages = !!get(slice, ['items', 0, 'image', 'images'])

    const table = (
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          backgroundColor: '#d2b8b833'
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#a3a3ca' }}>
            <th style={{ textAlign: 'left' }}>Indicators</th>
            <th>Unit</th>
            <th>Raw</th>
            <th>Treated</th>
          </tr>
        </thead>

        {this.state.municipal &&
          this.state.municipal.map((key, article) => {
            return (
              <tr>
                <td style={{ textAlign: 'left' }}>{key.fields.Indicators}</td>
                <td style={{ textAlign: 'center' }}>{key.fields.Unit}</td>
                <td style={{ textAlign: 'center' }}>{key.fields.Raw}</td>
                <td style={{ textAlign: 'center' }}>{key.fields.Treated}</td>
              </tr>
            )
          })}
      </table>
    )

    const TableGroundWater = (
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          backgroundColor: '#d2b8b833'
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#a3a3ca' }}>
            <th style={{ textAlign: 'left' }}>Indicators</th>
            <th>Unit</th>
            <th>Raw</th>
            <th>Treated</th>
          </tr>
        </thead>

        {this.state.arsenicGroundwater &&
          this.state.arsenicGroundwater.map((key, article) => {
            return (
              <tr>
                <td style={{ textAlign: 'left' }}>{key.fields.Indicators}</td>
                <td style={{ textAlign: 'center' }}>{key.fields.Unit}</td>
                <td style={{ textAlign: 'center' }}>{key.fields.Raw}</td>
                <td style={{ textAlign: 'center' }}>{key.fields.Treated}</td>
              </tr>
            )
          })}
      </table>
    )

    const GlyphosateRemoval = (
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          backgroundColor: '#d2b8b833'
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#a3a3ca' }}>
            <th style={{ textAlign: 'left' }}>Contaminant</th>
            <th>Unit</th>
            <th>After-pre-treatment</th>
            <th>Treated</th>
          </tr>
        </thead>

        {this.state.glyphosateRemoval &&
          this.state.glyphosateRemoval.map((key, article) => {
            return (
              <tr>
                <td style={{ textAlign: 'left', whiteSpace: 'nowrap' }}>
                  {key.fields.Contaminant}
                </td>
                <td style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                  {key.fields.Unit}
                </td>
                <td style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                  {key.fields.AfterPreTreatment}
                </td>
                <td style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                  {key.fields.Treated}
                </td>
              </tr>
            )
          })}
      </table>
    )

    // const GlyphosateRemovalTable2 = (
    //   <table
    //     style={{
    //       width: '100%',
    //       borderCollapse: 'collapse',
    //       backgroundColor: '#d2b8b833'
    //     }}
    //   >
    //     <thead>
    //       <tr style={{ backgroundColor: '#a3a3ca' }}>
    //         <th style={{ textAlign: 'left' }}>Column1</th>
    //         <th>Conventional Solution</th>
    //         <th>Infinite Water Solution</th>
    //       </tr>
    //     </thead>

    //     {this.state.glyphosateRemovaltable2 &&
    //       this.state.glyphosateRemovaltable2.map((key, article) => {
    //         return (
    //           <tr>
    //             {/* <td style={{ textAlign: "center" }}>{key.fields.AfterPreTreatment}</td> */}
    //             <td style={{ textAlign: 'left', whiteSpace: 'nowrap' }}>
    //               {key.fields && key.fields.Column1}
    //             </td>
    //             <td style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
    //               {key.fields && key.fields.ConventionalSolution}
    //             </td>
    //             <td style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
    //               {key.fields && key.fields.InfiniteWaterSolution}
    //             </td>
    //           </tr>
    //         )
    //       })}
    //   </table>
    // )

    const GlyphosateRemovalTable1 = (
      <div>
        {GlyphosateRemoval}
        {/* <br /> */}
        {/* {GlyphosateRemovalTable2} */}
      </div>
    )
    // const TableIndustrial = (
    //   <table style={{ width: '100%' }}>
    //     <tr>
    //       <th>Indicators</th>
    //       <th>Raw</th>
    //       <th>Unit</th>
    //       <th>Treated</th>
    //     </tr>

    //     {this.state.tableIndustrial &&
    //       this.state.tableIndustrial.map((key, article) => {
    //         return (
    //           <tr>
    //             <td style={{ textAlign: 'center' }}>{key.fields.Indicators}</td>
    //             <td style={{ textAlign: 'center' }}>{key.fields.Raw}</td>
    //             <td style={{ textAlign: 'center' }}>{key.fields.Unit}</td>
    //             <td style={{ textAlign: 'center' }}>{key.fields.Treated}</td>
    //           </tr>
    //         )
    //       })}
    //   </table>
    // )
    // const multiplex_construction = (
    //   <table style={{ width: "100%" }}>
    //     <tr>
    //       <th>Indicators</th>
    //       <th>Raw</th>
    //       <th>Unit</th>
    //       <th>Treated</th>
    //     </tr>

    //     {this.state.multiplexConstruction &&
    //       this.state.multiplexConstruction.map((key, article) => {
    //         return (
    //           <tr>
    //             <td style={{ textAlign: "center" }}>{key.fields.Indicators}</td>
    //             <td style={{ textAlign: "center" }}>{key.fields.Raw}</td>
    //             <td style={{ textAlign: "center" }}>{key.fields.Unit}</td>
    //             <td style={{ textAlign: "center" }}>{key.fields.Treated}</td>
    //           </tr>
    //         );
    //       })}
    //   </table>
    // );
    // const peoples_liberation = (
    //   <table style={{ width: "100%" }}>
    //     <tr>
    //       <th>Indicators</th>
    //       <th>Raw</th>
    //       <th>Unit</th>
    //       <th>Treated</th>
    //     </tr>

    //     {this.state.peoplesLiberation &&
    //       this.state.peoplesLiberation.map((key, article) => {
    //         return (
    //           <tr>
    //             <td style={{ textAlign: "center" }}>{key.fields.Indicators}</td>
    //             <td style={{ textAlign: "center" }}>{key.fields.Raw}</td>
    //             <td style={{ textAlign: "center" }}>{key.fields.Unit}</td>
    //             <td style={{ textAlign: "center" }}>{key.fields.Treated}</td>
    //           </tr>
    //         );
    //       })}
    //   </table>
    // );
    const TreatmentGroundWater = (
      <table
        style={{
          width: '100%',
          backgroundColor: '#d2b8b833',
          borderCollapse: 'collapse'
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#a3a3ca' }}>
            <th style={{ textAlign: 'left' }}>Indicators</th>
            <th>Raw</th>
            <th>Unit</th>
            <th>Treated</th>
          </tr>
        </thead>

        {this.state.treatmentGroundwater &&
          this.state.treatmentGroundwater.map((key, article) => {
            return (
              <tr>
                <td style={{ textAlign: 'left' }}>{key.fields.Indicators}</td>
                <td style={{ textAlign: 'center' }}>{key.fields.Raw}</td>
                <td style={{ textAlign: 'center' }}>{key.fields.Unit}</td>
                <td style={{ textAlign: 'center' }}>{key.fields.Treated}</td>
              </tr>
            )
          })}
      </table>
    )
    const ManufacturingWasteWater = (
      <div style={{ display: 'block' }}>
        <div
          style={{
            width: '114px',
            height: '30px',
            marginLeft: '128px',
            border: '1px solid black',
            backgroundColor: '#d2b8b833',
            textAlign: 'center',
            borderColor: 'grey',
            borderRadius: '3px'
          }}
        >
          Polymer
        </div>
        <div
          style={{
            fontSize: '30px',
            marginTop: '-19px',
            position: 'absolute',
            zIndex: '1',
            width: '369px',
            textAlign: 'center',
            fontWeight: '300'
          }}
        >
          &#8595;
        </div>
        <div style={{ display: 'flex', marginTop: '3%' }}>
          <span style={{ textAlign: 'center' }}>Plant Effluent</span>
          <span style={{ fontSize: '30px', fontWeight: '300' }}>&#8594;</span>
          <div
            style={{
              border: '1px solid black',
              // width: "25%",
              backgroundColor: '#d2b8b833',
              display: 'block',
              borderColor: 'grey',
              borderRadius: '3px'
            }}
          >
            <div style={{ display: 'flex', fontSize: '16px' }}>
              Hydroxon<span style={{ fontSize: '10px' }}>TM</span>
            </div>
            <div style={{ display: 'flex', placeContent: 'space-between' }}>
              <span style={{ fontSize: '16px' }}>CAO</span>{' '}
              <span style={{ fontSize: '14px' }}> reactor</span>
            </div>
          </div>
          <span style={{ fontSize: '30px', fontWeight: '300' }}>&#8594;</span>
          <div
            style={{
              border: '1px solid black',
              width: '25%',
              backgroundColor: '#d2b8b833',
              fontSize: '16px',
              borderColor: 'grey',
              textAlign: 'center',
              borderRadius: '3px'
            }}
          >
            Mixing Tank
          </div>
          <span style={{ fontSize: '30px', fontWeight: '300' }}>&#8594;</span>
          <div
            style={{
              border: '1px solid black',
              // width: "25%",
              backgroundColor: '#d2b8b833',
              fontSize: '16px',
              textAlign: 'center',
              borderColor: 'grey',
              borderRadius: '3px'
            }}
          >
            Sludge Dewatering
          </div>
          <span
            style={{
              fontSize: '30px',
              // marginLeft: "20.3%",
              marginTop: '31px',
              position: 'absolute',
              zIndex: '1',
              // right: "right",
              textAlign: 'right',
              width: '325px',
              fontWeight: '300'
            }}
          >
            &#8595;
          </span>
          <span
            style={{
              fontSize: '16px',
              // marginLeft: "20.3%",
              marginTop: '60px',
              position: 'absolute',
              zIndex: '1',
              width: '392px',
              // right: "right",
              textAlign: 'right'
              // width: "602px",
            }}
          >
            Solids for disposal
          </span>
          <span style={{ fontSize: '30px', fontWeight: '300' }}>&#8594;</span>
          <span style={{ textAlign: 'center' }}>Treated Water</span>
        </div>
      </div>
    )
    const ManufacturingIndustry = (
      <div style={{ display: 'block' }}>
        <div
          style={{
            display: 'flex',
            placeContent: 'space-between',
            paddingLeft: '10%'
          }}
        >
          <div
            style={{
              border: '1px solid black',
              fontSize: '16px',
              borderColor: 'grey',
              height: '30px',
              width: '160px',
              textAlign: 'center',
              backgroundColor: '#d2b8b833',
              borderRadius: '3px'
            }}
          >
            IW Polymer blend
          </div>
          <div
            style={{
              fontSize: '30px',
              // marginLeft: "11.3%",
              marginTop: '10px',
              position: 'absolute',
              zIndex: '1',
              width: '185px',
              textAlign: 'center',
              fontWeight: '300'
            }}
          >
            &#8595;
          </div>
          <div
            style={{
              fontSize: '30px',
              // marginLeft: "11.3%",
              marginTop: '10px',
              position: 'absolute',
              zIndex: '1',
              width: '266px',
              textAlign: 'right',
              fontWeight: '300'
            }}
          >
            &#8595;
          </div>
          <div
            style={{
              border: '1px solid black',
              fontSize: '16px',
              borderColor: 'grey',
              width: '160px',
              textAlign: 'center',
              backgroundColor: '#d2b8b833',
              borderRadius: '3px'
            }}
          >
            Oxidant
          </div>
        </div>
        <div style={{ display: 'flex', marginTop: '3.4%' }}>
          <div
            style={{
              border: '1px solid black',
              fontSize: '16px',
              borderColor: 'grey',
              width: '30%',
              textAlign: 'center',
              backgroundColor: '#d2b8b833',
              height: '42px',
              whiteSpace: 'nowrap',
              paddingTop: '2%',
              borderRadius: '3px'
            }}
          >
            <span>Feed tank</span>
          </div>
          <span style={{ fontSize: '30px', fontWeight: '300' }}>&#8594;</span>
          <div
            style={{
              border: '1px solid black',
              fontSize: '16px',
              borderColor: 'grey',
              width: '30%',
              textAlign: 'center',
              backgroundColor: '#d2b8b833',
              height: '42px',
              whiteSpace: 'nowrap',
              paddingTop: '2%',
              borderRadius: '3px'
            }}
          >
            Mixing tank
          </div>
          <span style={{ fontSize: '30px', fontWeight: '300' }}>&#8594;</span>
          <div
            style={{
              border: '1px solid black',
              fontSize: '16px',
              borderColor: 'grey',
              width: '30%',
              textAlign: 'center',
              backgroundColor: '#d2b8b833',
              height: '42px',
              whiteSpace: 'nowrap',
              paddingTop: '2%',
              borderRadius: '3px'
            }}
          >
            Bagfilter
          </div>
          <span style={{ fontSize: '30px', fontWeight: '300' }}>&#8594;</span>
          <div
            style={{
              border: '1px solid black',
              fontSize: '12px',
              borderColor: 'grey',
              width: '30%',
              textAlign: 'center',
              backgroundColor: '#d2b8b833',
              height: '42px',
              display: 'block',
              borderRadius: '3px'
            }}
          >
            <div style={{ fontSize: '16px', display: 'flex' }}>
              Hydroxon <span style={{ fontSize: '12px' }}>TM</span>
            </div>
            <div style={{ display: 'flex', placeContent: 'space-between' }}>
              <span style={{ fontSize: '16px' }}> CAO </span>
              <span style={{ fontSize: '14px' }}> reactor </span>
            </div>
          </div>
          <span style={{ fontSize: '30px', fontWeight: '300' }}>&#8594;</span>
          <span style={{ textAlign: 'center' }}>Treated water</span>
          <span
            style={{
              fontSize: '30px',
              // marginLeft: "20.3%",
              marginTop: '24px',
              position: 'absolute',
              zIndex: '1',
              right: 'right',
              textAlign: 'center',
              width: '502px',
              fontWeight: '300'
            }}
          >
            &#8595;
          </span>
          <span
            style={{
              fontSize: '16px',
              // marginLeft: "20.3%",
              marginTop: '58px',
              position: 'absolute',
              zIndex: '1',
              right: 'right',
              textAlign: 'center',
              width: '520px'
            }}
          >
            Dry sludge for disposal
          </span>
        </div>
      </div>
    )
    const MiningWash = (
      <table
        style={{
          width: '100%',
          backgroundColor: '#d2b8b833',
          borderCollapse: 'collapse'
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#a3a3ca' }}>
            <th style={{ textAlign: 'left' }}>Indicators</th>
            <th>Raw</th>
            <th>Treated</th>
            <th>ADWG</th>
          </tr>
        </thead>

        {this.state.miningWash &&
          this.state.miningWash.map((key, article) => {
            return (
              <tr>
                <td style={{ textAlign: 'left' }}>{key.fields.Indicators}</td>
                <td style={{ textAlign: 'center' }}>{key.fields.Raw}</td>
                <td style={{ textAlign: 'center' }}>{key.fields.Treated}</td>
                <td style={{ textAlign: 'center' }}>{key.fields.ADWG}</td>
              </tr>
            )
          })}
      </table>
    )

    const HydroxTable = (
      <table
        style={{
          width: '100%',
          backgroundColor: '#d2b8b833',
          borderCollapse: 'collapse'
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#a3a3ca' }}>
            <th style={{ textAlign: 'left' }}> Microbal group</th>
            <th>Challenge test microorganism</th>
            <th>Final concentration</th>
            <th>Units</th>
            <th>LRV demostrated by the HYDROXON</th>
            <th>
              LRV that could be credited to secondary treatment plus HYDROXON
              process
            </th>
            <th>
              Queensland Class A+ and AGWR dual reticulation LRV requirements
            </th>
          </tr>
        </thead>

        {this.state.hydrox &&
          this.state.hydrox.map((key, article) => {
            return (
              <tr>
                <td style={{ textAlign: 'left' }}>{key.fields.Microbal}</td>
                <td style={{ textAlign: 'center' }}>{key.fields.Challenge}</td>
                <td style={{ textAlign: 'center' }}>{key.fields.Final}</td>
                <td style={{ textAlign: 'center' }}>{key.fields.Units}</td>
                <td style={{ textAlign: 'center' }}>
                  {key.fields.Demostrated}
                </td>
                <td style={{ textAlign: 'center' }}>{key.fields.treatment}</td>
                <td style={{ textAlign: 'center' }}>{key.fields.Queensland}</td>
              </tr>
            )
          })}
      </table>
    )

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

    return (
      <Section>
        <div
          className={cn(
            splitIntoColumn
              ? classes.columns
              : fullWidth
                ? classes.fullWidth
                : classes.container,
            className
          )}
        >
          <div className={cn(hasImages && classes.floatLeft)}>
            {slice.text && (
              <RichTextContainer
                className={cn(
                  classes.text,
                  splitIntoColumn && classes.textColumns
                )}
                content={slice.text.html}
              />
            )}
            {this.state.selectURL === 'qingyuan-industrial-park1111'
              ? table
              : this.state.selectURL === 'qingyuan-industrial-park111'
                ? TableGroundWater
                : this.state.selectURL === 'removal-glyphosate'
                  ? GlyphosateRemovalTable1
                  : this.state.selectURL === 'treatment-groundwater-treatment'
                    ? TreatmentGroundWater
                    : this.state.selectURL === 'mining-wash-down-for-safe-discharge'
                      ? MiningWash
                      : this.state.selectURL ===
                'hydroxon-aop-advanced-oxidation-process--disinfection-innovation-for-water-recycling-and-reuse'
                        ? HydroxTable
                        : this.state.selectURL ===
                'hydroxon-aop-advanced-oxidation-process--disinfection-innovation-for-water-recycling-and-reuse-2'
                          ? HydroxTable
                          : null}
            {slice.link_url && slice.link_text && (
              <CTA
                className={cn(classes.link, {
                  withMargin: slice.text && slice.text.text
                })}
                text={slice.link_text}
                to={slice.link_url.url}
                target={slice.link_url.target}
              />
            )}

            {this.state.selectURL === 'groundwater-contamination-treatment-solutions' && slice.video_url && slice.video_url.url && (
              // <iframe style='max-width: 85.5%; padding-left: 14.5%' width='100%' height='315' src='https://www.youtube.com/embed/oI3QI5SRBFY' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen />
              <img src='https://www.youtube.com/embed/oI3QI5SRBFY' alt='' />
            )}
            {/* {this.state.selectURL === 'groundwater-contamination-treatment-solutions' && slice.video_url && <iframe width='100%' height='315' src='https://www.youtube.com/embed/oI3QI5SRBFY' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen />} */}
          </div>
          {hasImages && (
            <div className={classes.floatRight}>
              <FloatingImages images={slice.items.map((x) => x.image)} />
              {this.state.selectURL ===
              'manufacturing-wastewater-discharge-treatment'
                ? ManufacturingWasteWater
                : this.state.selectURL ===
                  'wastewater-treatment-manufacturing-industry'
                  ? ManufacturingIndustry
                  : null}
            </div>
          )}
        </div>
      </Section>
    )
  }
}

export default injectSheet((theme) => ({
  floatLeft: {
    float: 'left',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50%',
      maxWidth: theme.text.maxWidth
    }
  },
  floatRight: {
    float: 'right',
    width: '50%',
    paddingLeft: theme.spacing.lg,
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block'
    }
  },
  container: {
    '&::after': {
      content: '""',
      clear: 'both',
      display: 'table'
    }
  },
  fullWidth: {
    width: '100%',
    maxWidth: 860,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  columns: {
    columns: '400px 2',
    margin: [0, `-${theme.spacing.md}`],
    '& > *': {
      [theme.breakpoints.up('md')]: {
        maxWidth: theme.text.maxWidth
      }
    }
  },
  text: {
    '& > *:last-child': {
      marginBottom: 0
    }
  },
  textColumns: {
    '& > *': {
      marginLeft: theme.spacing.md,
      marginRight: theme.spacing.md
    }
  },
  link: {
    display: 'block',
    color: theme.colors.water,
    '&.withMargin': {
      marginTop: theme.spacing.md
    }
  }
}))(RichTextSlice)
