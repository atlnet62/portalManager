export const checkIp = (request, response) => {
    // console.log(request.socket.remoteAddress);
    // console.log(request.ip);
    const password = Math.random().toString(36).replace('0.', '');
    response.send(`your password is : ${password}`);
}