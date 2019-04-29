// require('dotenv').config();
var bodyParser = require('body-parser');
mongoose       = require('mongoose'),
express        = require('express'),
app            = express();
// const PORT = parseInt(process.env.PORT);
// App config
mongoose.connect('mongodb://localhost/restful_blog_app', {useNewUrlParser: true});
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

// Mongoose/model Config
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model('Blog', blogSchema);
// Blog.create({
//     title: 'Text blog',
//     image: 'https://source.unsplash.com/random',
//     body: 'this is blog post'
// });
// RESTFUL ROUTES
app.get('/', function(req, res) {
    res.redirect('/blogs')
});

app.get('/blogs', function(req, res) {
    Blog.find({}, function(err, blogs) {
        if(err){
            console.log('ERROR!');
        } else {
             res.render('index', {blogs});
        }
    });
});
// New route
app.get('/blogs/new', function(req, res) {
    res.render('new');
});
// Create Route
app.post('/blogs', function(req, res) {
    // Create blog
    var title = req.body.title;
    var image = req.body.image;
    var body = req.body.body;
    var inputValues = {title, image, body};
    Blog.create(inputValues, function(err, newBlog) {
        if(err) {
            res.render('new');
        } else {
            // Then, redirect to the index
            res.redirect('/blogs');
        }
    });
});
app.get('/blogs/:id', function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
        if(err) {
            res.redirect('/blogs');
        } else {
            res.render('show', {blog: foundBlog});
        }
    });
});
app.listen(3000, process.env.IP, function(req, res) {

    console.log('test1312');
});