import express from "express";
import { PrismaClient } from "@prisma/client";

const dB = new PrismaClient();

const app = express();

app.use(express.json()); 

const port = 7000;     

app.get("/gaminggear", async (req, res) => {
    try {
        const gaminggear = await dB.gaminggear.findMany();
        if(!gaminggear) throw new Error("Gear Tidak Ditemukan(error find many)");
        res.send(gaminggear);
    } catch (err) {
        res.send({ status: 404, message: err.message});
    }
});

app.get("/gaminggear/:id", async (req, res) => {
   try {
    const gaminggear = await dB.gaminggear.findUnique({
        where: {
            id: parseInt(req.params.id),
        },
    });
    if(!gaminggear) throw new Error("Gear Tidak Ditemukan(error unique)");
    res.send(gaminggear);
   } catch (err) {
    res.send({status: 404, message: err.message});
   }
});

app.post("/gaminggear/create/", async (req, res) => {
    try {
      const gaminggear = await dB.gaminggear.create({
        data: {
          nama: req.body.nama,
          price: req.body.price,
          qty: req.body.qty,
        },
      });
      res.send({ message: "Gear Berhasil Ditambahkan!", data: gaminggear });
    } catch (err) {}
  });

app.put("/gaminggear/update", async (req, res) => {
    try {
      const gaminggear = await dB.gaminggear.update({
        where: {
          id: req.body.id,
        },
        data: {
          nama: req.body.nama,
          price: req.body.price,
          qty: req.body.qty,
        },
      });
      res.send({ message: "Gagal Update", data: gaminggear });
    } catch (err) {}
});
  

app.delete("/gaminggear/delete", async (req, res) => {
    await dB.gaminggear.delete({
      where: {
        id: req.body.id,
      },
    });
    res.send({ message: "Gear Sudah Berhasil di hapus" });
});

app.listen(port, () => {
    console.log(`Aplikasi Berjalan Pada Port: ${port}`);
});
