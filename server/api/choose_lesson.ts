import net from "net";


export default defineEventHandler((event) => new Promise((res, _) => {
    const client = net.createConnection({
        port: 6379
    });
    client.on("connect", () => {
        client.write("*3\r\n+find\r\n+Lesson\r\n");
    });
    client.on("data", buffer => {
        setTimeout(() => {
            client.destroy();
        }, 3000);
        res(buffer.toString().split("\r\n"));
    });
}));