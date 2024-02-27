import {Component} from 'react'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import BlogItem from '../BlogItem'

import './index.css'

class BlogsList extends Component {
  state = {blogsData: [], isLoading: true}

  componentDidMount() {
    this.getBlogsData()
  }

  getBlogsData = async () => {
    const url = 'https://apis.ccbp.in/blogs'
    const response = await fetch(url)
    const data = await response.json()
    // console.log(data)
    const updatedData = data.map(eachItem => ({
      id: eachItem.id,
      avatarUrl: eachItem.avatar_url,
      author: eachItem.author,
      imageUrl: eachItem.image_url,
      topic: eachItem.topic,
      title: eachItem.title,
    }))
    console.log(updatedData)
    this.setState({blogsData: updatedData, isLoading: false})
  }

  render() {
    const {blogsData, isLoading} = this.state
    return (
      <div className="blog-list-container">
        {isLoading ? (
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        ) : (
          blogsData.map(item => <BlogItem blogData={item} key={item.id} />)
        )}
      </div>
    )
  }
}

export default BlogsList
