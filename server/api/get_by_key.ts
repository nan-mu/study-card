import net from "net";


export default defineEventHandler((event) => new Promise((res, rej) => {
    const client = net.createConnection({
        port: 6379
    });
    const query = getQuery(event);
    client.on("connect", () => {
        // console.log(event.context);
        if ((query.key as string)[0] != "+") {
            console.log("get rej false key");
            rej();
        }
        client.write("*2\r\n+get\r\n" + query.key + "\r\n");
    });
    client.on("data", buffer => {
        client.destroy();
        let get = buffer.toString();
        // console.log(get);
        if (get[0] == "-") {
            console.log("get rej bad data: " + get);
            rej()
        }
        let data_info_arrary = get.split("\r\n")[0].split(",");
        if (query.type == "Lesson") {
            let data_info = {
                "系": data_info_arrary[0].split("：")[1],
                "课程代码": data_info_arrary[1].split("：")[1],
                "课程名称": data_info_arrary[2].split("：")[1],
                "课程性质": data_info_arrary[3].split("：")[1],
                "校区": data_info_arrary[4].split("：")[1],
                "班级": data_info_arrary[5].split("：")[1],
                "人数": data_info_arrary[6].split("：")[1],
                "学分": data_info_arrary[7].split("：")[1],
                "学时": data_info_arrary.slice(8).join(),
                enable: false
            }
            res(data_info);
        } else if (query.type == "Student") {
            let data_info = {
                "学号": data_info_arrary[0].split("：")[1],
                "姓名": data_info_arrary[1].split("：")[1],
                "性别": data_info_arrary[2].split("：")[1],
                "班级": data_info_arrary[3].split("：")[1],
                "专业": data_info_arrary[4].split("：")[1],
            }
            // console.log(data_info);
            res(data_info);
        }
    });
}));