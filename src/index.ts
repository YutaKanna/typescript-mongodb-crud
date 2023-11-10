import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import User from './User'; // User モデルをインポート

const app = express();
const port = 3000;

// Body-parser middleware
app.use(bodyParser.json());

// MongoDB 接続
mongoose.connect('mongodb://username:password@サーバーアドレス:ポート/データベース名');

mongoose.connection.on('open', () => {
  console.log('MongoDB connection established.');
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // 変更
});

app.get('/users/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      console.log(user);
      console.log("userです")
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
});

// ユーザー作成
app.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

// ユーザー情報の取得
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// ユーザー情報の更新
app.patch('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// ユーザーの削除
app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// サーバー起動
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
