import React, { PureComponent } from 'react'
import injectSheet from 'react-jss'
import cn from 'classnames'
import ResponsiveImage from '../widgets/ResponsiveImage'
import RichTextContainer from '../widgets/RichTextContainer'
import CTA from '../widgets/CTA'
import Link from '../widgets/Link'
import Section from '../widgets/Section'
import BackButton from '../../img/icons/BackButton.svg'
import NextButton from '../../img/icons/NextButton.svg'
import Symbol from '../SVGSymbol'

class Articles extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      selectURL: '',
      current_page: 1,
      records_per_page: 6,
      pageNumber: 1,
      articleContent: {},
      articleArray: [],
      prevflag: 'visible',
      nextflag: 'visible'
    }
  }

  componentDidMount () {
    this.changePage(1)
  }
  componentWillReceiveProps () {
    this.changePage(1)
  }
  prevPage = () => {
    if (this.state.current_page > 1) {
      this.state.current_page--
      this.changePage(this.state.current_page)
    }
  }

  nextPage = () => {
    if (this.state.current_page < this.numPages()) {
      this.state.current_page++
      this.changePage(this.state.current_page)
    }
  }

  changePage = (pages) => {
    const { page, classes, slice } = this.props

    // Validate page
    if (pages < 1) pages = 1
    if (pages > this.numPages()) pages = this.numPages()
    const articleContentArray = []

    for (let i = (pages - 1) * this.state.records_per_page; i < (pages * this.state.records_per_page); i++) {
      if (page.articles[i]) {
        const heroImage = page.articles[i].hero_image && (
          <Link className={classes.imageContainer} to={page.articles[i].url}>
            <ResponsiveImage
              className={cn(classes.image, { reverse: i % 2 })}
              images={page.articles[i].hero_image.images}
              blur={page.articles[i].hero_image.blur}
              aspect={1}
            />
          </Link>)

        const articleVideo = page.articles[i].article_video &&
          <Link className={classes.imageContainer} to={page.articles[i].url} style={{textAlign: 'center'}} >
            <video className={classes.video} style={{width: '100%', height: 300, outline: 'none'}} controls>
              <source src={page.articles[i].article_video.url} type='video/mp4' />
            </video>
          </Link>

        const articleContent = <div className={cn(classes.content, { reverse: i % 2 })}>
          <h5 className={classes.title}>{page.articles[i].title.text}</h5>
          <p style={{paddingLeft: '3%'}}>{page.articles[i].date.text}</p>
          <RichTextContainer className={classes.textcontainer} content={page.articles[i].summary.html} />
          {this.state.selectURL === 'blogs' ? (
            <CTA
              className={classes.bloglink}
              to={page.articles[i].url}
              text={slice.cta_text || 'Read Full Article'}
            />
          ) : (
            <CTA
              className={classes.link}
              to={page.articles[i].url}
              text={slice.cta_text || 'Read Full Article'}
            />
          )}
        </div>

        const article = <a className={cn(classes.articleContainer, { reverse: i % 2 })} key={page.articles[i].uid} style={{backgroundColor: 'white', color: 'black', display: 'block', width: '30%', border: '1px solid #e7e7e7', marginLeft: '3%'}}
          href={page.articles[i].url}>
          {heroImage}
          {articleVideo}
          {articleContent}
        </a>

        articleContentArray.push(article)
      }
    }
    this.setState({articleArray: articleContentArray})

    this.setState({pageNumber: pages})
    if (pages === 1) {
      this.setState({prevflag: 'hidden'})
    } else {
      this.setState({prevflag: 'visible'})
    }

    if (pages === this.numPages()) {
      this.setState({nextflag: 'hidden'})
    } else {
      this.setState({nextflag: 'visible'})
    }
  }
  numPages = () => {
    const { page } = this.props
    return Math.ceil(page.articles.length / this.state.records_per_page)
  }
  render () {
    const { classes, page } = this.props

    if (!page) return

    const ch =
      typeof window !== 'undefined' && window.location.href.split('/')[3]

    if (ch === 'zh') {
      this.setState({ selectURL: page.url.split('/')[3] })
    } else {
      this.setState({ selectURL: page.url.split('/')[2] })
    }
    return (
      <Section className={classes.section}>
        {this.state.articleArray}
        <div className={classes.pagesection}>

          <div onClick={this.prevPage} style={{'visibility': this.state.prevflag}} className={classes.prevpage}>
            <Symbol icon={BackButton} style={{width: '51px', height: '51px', color: 'white'}} />
            <span style={{cursor: 'pointer', marginTop: '2%', color: 'white'}} id='btn_prev'>Prev</span>
          </div>
          <div className={classes.page}>
            page: <span id='page'> {this.state.pageNumber} </span>
          </div>
          <div onClick={this.nextPage} style={{'visibility': this.state.nextflag}} className={classes.nextpage}>
            <span style={{cursor: 'pointer', marginTop: '2%', color: 'white', marginRight: '3%'}} id='btn_next'>Next</span>
            <Symbol icon={NextButton} style={{width: '51px', height: '51px', color: 'white'}} />
          </div>
        </div>
      </Section>
    )
  }
}

export default injectSheet((theme) => ({
  section: {
    flexWrap: 'wrap',
    display: 'flex',
    '@media only screen and (max-width: 420px)': {
      flexWrap: 'none',
      display: 'block'
    }
  },
  textcontainer: {
    width: '100%',
    height: '100px',
    paddingLeft: '3%',
    paddingRight: '3%',
    WebkitLineClamp: 4,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'Ellipsis',
    display: '-webkit-box'
  },
  page: {
    width: '33.3%',
    textAlign: 'center',
    color: 'white',
    marginTop: '0.8%',
    '@media only screen and (max-width: 420px)': {
      marginTop: '1.8%'
    }
  },
  pagesection: {
    display: 'flex',
    paddingLeft: '2%',
    width: '100%',
    '@media only screen and (max-width: 420px)': {
      width: '97%'
    }
  },
  prevpage: {
    cursor: 'pointer',
    display: 'flex',
    width: '33.3%',
    '@media only screen and (max-width: 420px)': {
      '& span': {
        marginTop: '6% !important'
      }
    }
  },
  nextpage: {
    cursor: 'pointer',
    display: 'flex',
    width: '33.3%',
    textAlign: 'right',
    justifyContent: 'flex-end',
    '@media only screen and (max-width: 420px)': {
      '& span': {
        marginTop: '6% !important'
      }
    }
  },
  articleContainer: {
    display: 'block',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    '&:hover': {
      backgroundColor: '#607d8ba1'
    },
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      '&.reverse': {
        flexDirection: 'row-reverse'
      }
    },
    '@media only screen and (max-width: 420px)': {
      width: '90% !important'
    }
  },
  imageContainer: {
    flex: '1 1 0%',
    display: 'block',
    '&:hover': {

    },
    [theme.breakpoints.up('md')]: {
      '&:hover': {
        // backgroundColor: 'red'
      }
    }
  },
  image: {
    maxWidth: 520,
    [theme.breakpoints.up('md')]: {
      marginLeft: 0,
      marginRight: 'auto',
      '&.reverse': {
        marginLeft: 'auto',
        marginRight: 0
      }
    }
  },
  video: {
    marginLeft: '19%'
  },
  content: {
    flex: '1 1 0%',
    maxWidth: 520,
    margin: 'auto',
    padding: [theme.spacing.md, 0, theme.spacing.lg],
    [theme.breakpoints.up('md')]: {
      // padding: theme.spacing.lg,
      paddingRight: 0,
      maxWidth: '100%',
      '&.reverse': {
        // paddingRight: theme.spacing.lg,
        paddingLeft: 0
      }
    }
  },
  title: {
    lineHeight: '1.5rem',
    width: '100%',
    paddingLeft: '3%',
    paddingRight: '3%'
  },
  link: {
    color: '#607d8b',
    paddingLeft: '3%'
  },
  bloglink: {
    color: '#4d4e56',
    paddingLeft: '3%',
    '&:hover': {
      color: '#4d4e56'
    }
  }
}))(Articles)
