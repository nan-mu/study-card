import net from "net";


export default defineEventHandler((event) => new Promise((res, rej) => {
    const client = net.createConnection({
        port: 6379
    });
    client.on("connect", () => {
        // console.log(event.context);
        const query = getQuery(event);
        if ((query.key as string)[0] != "+") {
            console.log("get rej false key");
            rej();
        }
        client.write("*2\r\n+get\r\n" + query.key + "\r\n");
    });
    client.on("data", buffer => {
        client.destroy();
        let get = buffer.toString();
        if (get[0] == "-") {
            console.log("get rej bad data: " + get);
            rej()
        }
        let lesson_info_arrary = get.split("\r\n")[0].split(",");
        let lesson_info = {
            "系": lesson_info_arrary[0].split("：")[1],
            "课程代码": lesson_info_arrary[1].split("：")[1],
            "课程名称": lesson_info_arrary[2].split("：")[1],
            "课程性质": lesson_info_arrary[3].split("：")[1],
            "校区": lesson_info_arrary[4].split("：")[1],
            "班级": lesson_info_arrary[5].split("：")[1],
            "人数": lesson_info_arrary[6].split("：")[1],
            "学分": lesson_info_arrary[7].split("：")[1],
            "学时": lesson_info_arrary.slice(8).join(),
            enable: false
        }
        res(lesson_info);
    });
}));