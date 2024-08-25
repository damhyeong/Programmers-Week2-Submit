function route(pathname, handle, response, productId) {
    if(pathname === "/favicon.ico")
        return;

    console.log(pathname);

    if(handle.hasOwnProperty(pathname)){
        handle[pathname](response, productId);
    } else {
        response.writeHead(404, {'Content-Type' : 'text/html'});
        response.write('Not Found');
        response.end();
    }
}

exports.route = route;