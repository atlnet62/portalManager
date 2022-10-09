export default (request, response, next) => {
    if(request.params.role_id === 3){
        next();
    } else {
        response.status(308).json({
            isNotAdmin: "Yes",
        });
    }
}