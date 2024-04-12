import net from "net";


export default defineEventHandler((event) => new Promise((res, _) => {
    const client = net.createConnection({
        port: 6379
    });
    client.on("connect", () => {
        client.write("*3\r\n+find\r\n+Lesson\r\n");
    });
    client.on("data", buffer => {
        client.destroy();
        let lesson = buffer.toString().split("\r\n");
        lesson.shift();
        lesson.pop();
        // console.log(lesson);
        for (let index = 0; index < lesson.length; index++) {
            const element = lesson[index];
            if (element[0] != "+") {
                console.log("bad data: " + element);
            }
        }
        res(lesson);
    });
}));