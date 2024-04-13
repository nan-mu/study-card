import net from "net";


export default defineEventHandler((event) => new Promise((res, _) => {
    const client = net.createConnection({
        port: 6379
    });
    const query = getQuery(event);
    client.on("connect", () => {
        client.write(`*3\r\n+find\r\n+${query.type}\r\n`);
    });
    client.on("data", buffer => {
        client.destroy();
        if (query.type == "Lesson") {
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
        } else if (query.type == "Student") {
            let student = buffer.toString().split("\r\n");
            student.shift();
            student.pop();
            // console.log(student);
            for (let index = 0; index < student.length; index++) {
                const element = student[index];
                if (element[0] != "+") {
                    console.log("bad data: " + element);
                }
            }
            res(student);
        }
    });
}));