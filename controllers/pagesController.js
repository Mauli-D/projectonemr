exports.show = (req, res) => {
    const path = (req.path === '/') ? '/home' : req.path;
    
    //render the view
    res.render(`pages${path}`);
};