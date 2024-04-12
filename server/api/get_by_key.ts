import net from "net";


export default defineEventHandler((event) => new Promise((res, _) => {
    const client = net.createConnection({
        port: 6379
    });
    client.on("connect", () => {
        // console.log(event.context);
        const query = getQuery(event);
        console.log(query.key);
        client.write("*2\r\n+get\r\n" + query.key + "\r\n");
    });
    client.on("data", buffer => {
        setTimeout(() => {
            client.destroy();
        }, 3000);
        res(buffer.toString().split("\r\n"));
    });
}));