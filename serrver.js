const port = 3030;
const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const SanPhamModel = require('./sanPhamModel');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//
app.use(bodyParser.urlencoded({ extended: true }));
//call 
app.engine("hbs", exphbs.engine({
    extname: 'hbs',
    defaultLayout: 'home',
    layoutsDir: 'views/layouts/',
}));

app.set('view engine', 'hbs');
app.set('views', './views');


// get data
app.get('/', async (req, res) => {
    const uri = 'mongodb+srv://chinhnvph23300:PEoGUuTokPCDDAzs@cluster0.yrmlvp6.mongodb.net/Demo1234?retryWrites=true&w=majority';
    await mongoose.connect(uri);
    let arrSp = await SanPhamModel.find().lean(); // chuyển đổi sang kiểu plain JavaScript object
    res.render('emptyView', {
        layout: 'home',
        arrSp: arrSp, // không cần gọi phương thức .map() nữa
    });
});
app.get('/showSearch', (req, res) => {
    res.render('emptyView', {
        layout:'search',
    });
})




//search data 
app.post('/search', async (req, res) => {
    const uri = 'mongodb+srv://chinhnvph23300:PEoGUuTokPCDDAzs@cluster0.yrmlvp6.mongodb.net/Demo1234?retryWrites=true&w=majority';
    const searchString = req.body.search;
    await mongoose.connect(uri);
    let searchData = await SanPhamModel.find({ name: searchString }).lean();
    console.log(searchData + ' tìm kiếm 2 ');
    console.log(searchString + " tìm kiếm");
    res.render('emptyView', {
        layout: 'home',
        searchData: searchData,
    })
});


//
app.get('/add', (req, res) => {
    res.render('emptyView',
        { layout: 'themnv' });
});
app.post('/add', async (req, res) => {
    const uri = 'mongodb+srv://chinhnvph23300:PEoGUuTokPCDDAzs@cluster0.yrmlvp6.mongodb.net/Demo1234?retryWrites=true&w=majority';
    await mongoose.connect(uri).then(console.log('Kết nối server thành công'));
    const name = req.body.name;
    const age = req.body.age;
    const address = req.body.address;
    console.log(name + "," + age + "," + address);
    const addNv = new SanPhamModel({
        name: name,
        age: age,
        address: address,
    });
    let listNv = await SanPhamModel.find();
    let kq = await addNv.save();
    console.log(kq);
    console.log(listNv);
    res.redirect('/');
});
//update
app.get('/update/:id', function (req, res) {
    const id = req.params.id;
    const name = req.query.name;
    const age = req.query.age;
    const address = req.query.address;
    console.log(id + " Hehe");
    res.render('emptyView', { layout: 'suanv', id: id, name: name, age: age, address: address });
});
app.post('/update', async function (req, res) {
    const uri = 'mongodb+srv://chinhnvph23300:PEoGUuTokPCDDAzs@cluster0.yrmlvp6.mongodb.net/Demo1234?retryWrites=true&w=majority';
    await mongoose.connect(uri).then(console.log('kết nối db thành công'));
    const idCheck = req.body.id;
    const name = req.body.name;
    const age = req.body.age;
    const address = req.body.address;

    console.log(idCheck + " hehe");
    try {
        const updateNhanVien = await SanPhamModel.findOneAndUpdate(
            { _id: idCheck },//điều kiện để tiến hành update
            { name: name, age: age, address: address },//các trường và giá trị cần cập nhật
            { new: true },
        );
        console.log(updateNhanVien);
        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

//delete
app.post('/delete', async function (req, res) {
    const uri = 'mongodb+srv://chinhnvph23300:PEoGUuTokPCDDAzs@cluster0.yrmlvp6.mongodb.net/Demo1234?retryWrites=true&w=majority';
    await mongoose.connect(uri).then(console.log('kết nối db thành công'));
    const id = req.body.hello;
    console.log(id + ' id xóa');
    try {
        const deleteNhanVien = await SanPhamModel.deleteOne({ _id: id, });
        console.log(deleteNhanVien);
        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
