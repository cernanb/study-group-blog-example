$(function() {
  bindClick()
})


function bindClick() {
  $('.js-prev').on('click', function(e) {
    const id = $(this).data('id')
    $('#app-container').html('')

    fetch(`/api/posts/next`)
      .then(res => res.json() )
      .then(post => {
        const newPost = new Post(post.id, post.title, post.content, post.comments, post.user)
        const postHTML = newPost.formatPost()
        $('#app-container').append(postHTML)
      })
      .catch(err => console.log(err))
      history.pushState(null, null, `/posts/${id - 1}`)

  })

  $('.js-next').on('click', function(e) {
    $('#app-container').html('')
    const id = $(this).data('id')
    fetch(`/api/posts/${id + 1}`)
      .then(res => res.json() )
      .then(post => {
        const newPost = new Post(post.id, post.title, post.content, post.comments, post.user)
        const postHTML = newPost.formatPost()
        $('#app-container').append(postHTML)
      })
      .catch(err => console.log(err))
    history.pushState(null, null, `/posts/${id + 1}`)
  })
}

function Post(id, title, content, comments, user) {
  this.id = id
  this.title = title
  this.content = content
  this.comments = comments
  this.user = user
}

Post.prototype.formatPost = function() {
  let html = ''

  html = `
    <h1>Title: ${this.title}</h1>
    <h2>Author: ${this.user.email}</h2>
    <p>${this.content}</p>
  `
  return html
}
