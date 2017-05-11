$(() => {
  bindClickHandlers()
})

const bindClickHandlers = () => {
  $('.all_posts').on('click', e => {
    e.preventDefault()
    history.pushState(null, null, "posts")
    getPosts()

  })

  $(document).on('click', ".show_link", function(e) {
    e.preventDefault()
    $('#app-container').html('')
    let id = $(this).attr('data-id')
    fetch(`/posts/${id}.json`)
    .then(res => res.json())
    .then(post => {
      let newPost = new Post(post)

      let postHtml = newPost.formatShow()

      $('#app-container').append(postHtml)
    })
  })

  $(document).on('click', 'next-post', function() {
    let id = $(this).attr('data-id')
    fetch(`posts/${id}/next`)

  })
}

const getPosts = () => {
  fetch(`/posts.json`)
    .then(res => res.json())
    .then(posts => {
       $('#app-container').html('')
       posts.forEach(post => {
         let newPost = new Post(post)

         let postHtml = newPost.formatIndex()

         $('#app-container').append(postHtml)
       })
    })
}

function Post(post) {
  this.id = post.id
  this.title = post.title
  this.content = post.content
  this.user = post.user
  this.comments = post.comments


}

Post.prototype.formatIndex = function(){
  let postHtml = `
    <a href="/posts/${this.id}" data-id="${this.id}" class="show_link"><h1>${this.title}</h1></a>
  `
  return postHtml
}

Post.prototype.formatShow = function(){
  let postHtml = `
    <h3>${this.title}</h3>
    <button class="next-post">Next</button>
  `
  return postHtml
}
