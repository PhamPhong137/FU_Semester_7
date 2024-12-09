// Khai bao MongoDB Driver module
const {MongoClient, ObjectId} = require("mongodb");

// Khai báo cấu hình MongoDB Server
const mongoDB_URI = "mongodb://127.0.0.1:27017/";
const dbName = "SE1760_Test";

// Khai báo và khởi tạo đối tượng kết nối CSDL
const client = new MongoClient(mongoDB_URI);

async function main(){
    // Tiến hành kết nối CSDL
    await client.connect();
    console.log("Connect successfully");

    // Chỉ định CSDL và collection cần làm việc
    const dbContext = client.db(dbName);
    const myCollection = dbContext.collection("departments");

    // CRUD basic

    // Chèn 1 document vào "departments" collection
    // const newDoc = {name: "IT", location: {floor: 1, room: "101"}};

    // Chèn 1 document vào "departments" collection
    //await myCollection.insertOne(newDoc).then(result => console.log(result));

    // Chèn hơn 1 documents:
    // await myCollection.insertMany([
    //     {name: "Marketing", location: {floor: 2, room: "201"}}, 
    //     {name: "Sale", location: {floor: 1, room: "102"}}
    // ]);

    // Cập nhật 1 document có _id: new ObjectId('66ffb3eb5e280eff857a34a7')
     //await myCollection.updateOne({_id: new ObjectId('66ffb3eb5e280eff857a34a7')}, {$set: {name:"Information Tech","location.room": "101"}});

     //Liệt kê các departments từ tầng 2 trở lên
    const listDepartments =  await myCollection.find({"location.floor": {$gte: 2}}).toArray();

    if(listDepartments){
        listDepartments.map(({_id: code,name: fullname, location: address}) => {
            console.log(`Department: ${fullname} at ${address.floor} floor, room ${address.room}`);
        
        });
    }
    // Xóa các documents đang ở tầng 1
    //await myCollection.deleteMany({"location.floor": 1});

    // Truy vấn lấy ra tất cả các departments
    //const listDepartmentss =  await myCollection.find({}).toArray();
    //console.log(listDepartments);

    return "done!";
}

// Thực thi các hoạt động trên DB
main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());