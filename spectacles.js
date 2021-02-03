const router = require("express").Router();
const connection = require("./config");

router.get("/", (req, res) => {
  connection.query(
    "select r.date, c.name as city_name, s.name as spectacle_name from representation r join spectacle s on s.id=r.spectacleId join city c on c.id=r.cityId",
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving spectacle");
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.post("/", (req, res) => {
  const { name, price, places } = req.body;
  connection.query(
    "INSERT INTO spectacle (name, price, places) VALUES (?, ?, ?)",
    [name, price, places],
    (err, results) => {
      if (err) {
        res.status(500).send("Error create a spectacle");
      } else {
        res.status(200).send("Successfully create");
      }
    }
  );
});

router.put("/:id", (req, res) => {
  const idSpectacle = req.params.id;
  const UpdatedSpectacle = req.body;
  connection.query(
    "UPDATE spectacle SET ? WHERE id = ?",
    [UpdatedSpectacle, idSpectacle],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error updating a spectacle");
      } else {
        res.status(200).send("Spectacle updated successfully");
      }
    }
  );
});

router.delete("/:id", (req, res) => {
  const idSpectacle = req.params.id;
  connection.query(
    "delete from spectacle where id = ?",
    [idSpectacle],
    (err, results) => {
      if (err) {
        res.status(500).send("Error deleting a spectacle");
      } else {
        res.status(200).send("Spectacle delete");
      }
    }
  );
});

module.exports = router;