const express = require("express");
const router = express.Router();
const { getDb } = require("../connect.cjs");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const db = getDb();

  try {
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      role: user.role,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Register Route
router.post("/register", async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    email,
    password,
    role,
    profileImage,
  } = req.body;
  const db = getDb();

  try {
    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      firstName,
      middleName,
      lastName,
      email,
      password: hashedPassword,
      role,
      profileImage,
    };

    // Insert new user
    const result = await db.collection("users").insertOne(newUser);

    const token = jwt.sign(
      { userId: result.insertedId, email, role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      role,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//Get all staff
router.get("/staff", async (req, res) => {
  const db = getDb();
  try {
    const staff = await db
      .collection("users")
      .find({ role: "staff" })
      .toArray();

    res.status(200).json({ staff });
  } catch (error) {
    console.error("Error fetching staff:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//Add New Transaction
router.post("/add-transaction", async (req, res) => {
  const { transactionID, image, name } = req.body;
  const db = getDb();

  try {
    const existingTransaction = await db.collection("transactions").findOne({
      name: { $regex: `^${name}$`, $options: "i" }, // case-insensitive exact match
    });
    if (existingTransaction) {
      return res
        .status(400)
        .json({ message: "Transaction name already exists" });
    }

    const newTransaction = {
      transactionID,
      image,
      name,
      isOn: true,
      isIDReset: false,
      createdAt: new Date(),
    };

    // Insert new transaction
    await db.collection("transactions").insertOne(newTransaction);

    res.status(201).json({ message: "Transaction added successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Edit Transaction
router.put("/edit-transaction/:id", async (req, res) => {
  const { id } = req.params;
  const { transactionID, image, name } = req.body;
  const db = getDb();

  try {
    const existingTransaction = await db
      .collection("transactions")
      .findOne({ _id: new ObjectId(id) });

    if (!existingTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Check if no changes were made
    const noChangesMade =
      (transactionID === undefined ||
        transactionID === existingTransaction.transactionID) &&
      (image === undefined || image === existingTransaction.image) &&
      (name === undefined || name === existingTransaction.name);

    if (noChangesMade) {
      return res.status(400).json({
        message: "No changes were made to the transaction",
      });
    }

    if (name && name !== existingTransaction.name) {
      const duplicateName = await db.collection("transactions").findOne({
        name: { $regex: `^${name}$`, $options: "i" }, // case-insensitive exact match
        _id: { $ne: new ObjectId(id) },
      });

      if (duplicateName) {
        return res.status(400).json({
          message: "Transaction name already exists",
        });
      }
    }

    const updatedTransaction = {
      ...(transactionID && { transactionID }),
      ...(image && { image }),
      ...(name && { name }),
    };

    await db
      .collection("transactions")
      .updateOne({ _id: new ObjectId(id) }, { $set: updatedTransaction });

    res.status(200).json({ message: "Transaction updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Reset isIDReset to true for all transactions
router.put("/reset-id-flags", async (req, res) => {
  const db = getDb();

  try {
    const result = await db
      .collection("transactions")
      .updateMany({}, { $set: { isIDReset: true } });

    res.status(200).json({
      message: "All transactions have isIDReset set to true",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("Error resetting isIDReset:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//Get all transactions
router.get("/transactions", async (req, res) => {
  const db = getDb();
  try {
    const transactions = await db.collection("transactions").find().toArray();

    res.status(200).json({ transactions });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//toggling the transaction
router.put("/transactions/:id/toggle", async (req, res) => {
  const { id } = req.params;
  const { isOn } = req.body;

  try {
    const db = getDb(); // or use Mongoose: Transaction.findByIdAndUpdate(...)
    await db
      .collection("transactions")
      .updateOne({ _id: new ObjectId(id) }, { $set: { isOn } });

    res.status(200).json({ message: "Toggle updated successfully" });
  } catch (error) {
    console.error("Toggle update error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//Generate Queue or Ticket number
router.post("/generate-queue-number", async (req, res) => {
  const { isIDReset, transactionID, userType } = req.body;
  const db = getDb();

  try {
    const latestQueue = await db
      .collection("queue-numbers")
      .find({ transactionID })
      .sort({ createdAt: -1 })
      .limit(1)
      .toArray();

    let newNumber;

    if (isIDReset) {
      newNumber = "001";

      await db
        .collection("transactions")
        .updateOne({ transactionID }, { $set: { isIDReset: false } });
    } else if (latestQueue.length > 0) {
      const lastQueue = latestQueue[0];
      // Match the last 3 digits (queue ID) and exclude " -PL" suffix
      const match = lastQueue.generatedQueuenumber.match(
        /(\d{3})(?=\s*(-PL)?$)/
      );

      if (match) {
        const lastNum = parseInt(match[1], 10);

        // Check for overflow (999 -> 001)
        if (lastNum === 999) {
          newNumber = "001"; // reset to 001 when overflow happens
        } else {
          const incremented = lastNum + 1;
          newNumber = incremented.toString().padStart(3, "0");
        }
      } else {
        newNumber = "001"; // fallback if no match
      }
    } else {
      newNumber = "001"; // first ever queue for this transaction
    }

    const isPriority = userType === "Senior or PWD" ? true : false;
    const isPriorityString = userType === "Senior or PWD" ? " -PL" : "";
    const generatedQueuenumber = transactionID + newNumber + isPriorityString;

    const newQueue = {
      transactionID,
      generatedQueuenumber,
      isPriority,
      status: "Waiting",
      windowNumber: "",
      createdAt: new Date(),
    };

    await db.collection("queue-numbers").insertOne(newQueue);

    res.status(201).json({
      message: "Queue number generated successfully",
      generatedQueuenumber,
    });
  } catch (error) {
    console.error("Error generating queue number:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//Get all queue numbers
router.get("/queue-numbers", async (req, res) => {
  const db = getDb();
  try {
    const queueNumbers = await db.collection("queue-numbers").find().toArray();

    res.status(200).json({ queueNumbers });
  } catch (error) {
    console.error("Error fetching queuenumbers:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//updating a queue
router.put("/queue-numbers/:id/update", async (req, res) => {
  const { id } = req.params;
  const { status, windowNumber } = req.body;

  try {
    const db = getDb();
    const queueNum = await db
      .collection("queue-numbers")
      .findOne({ _id: new ObjectId(id) });

    if (!queueNum) {
      return res.status(404).json({ message: "Ticket number not found" });
    }

    if (queueNum.status === "Completed") {
      return res
        .status(400)
        .json({ message: "Ticket number already completed" });
    }

    if (queueNum.status === "Processing" && status === "Processing") {
      return res.status(400).json({
        message:
          "This ticket is already being processed. Please select a different ticket.",
      });
    }

    await db.collection("queue-numbers").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          status,
          ...(windowNumber !== undefined && { windowNumber }), // Only set if provided
        },
      }
    );

    res.status(200).json({ message: "Queue number updated successfully" });
  } catch (error) {
    console.error("Queue number update error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Reset
// router.post("/reset-all-queue-number-id", async (req, res) => {
//   const db = getDb();

//   try {
//     // Delete all window assignments
//     const result = await db.collection("windowAssignments").deleteMany({});

//     console.log("Reset result:", result);

//     res.status(200).json({
//       message: "All window assignments have been reset",
//       deletedCount: result.deletedCount,
//     });
//   } catch (error) {
//     console.error("Error resetting window assignments:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// Get assigned windows
// router.get("/windows", async (req, res) => {
//   const db = getDb();
//   try {
//     // Check if windows collection exists, if not create it
//     const collections = await db
//       .listCollections({ name: "windowAssignments" })
//       .toArray();
//     if (collections.length === 0) {
//       await db.createCollection("windowAssignments");
//     }

//     const windowAssignments = await db
//       .collection("windowAssignments")
//       .find({})
//       .toArray();

//     res.status(200).json({ windowAssignments });
//   } catch (error) {
//     console.error("Error fetching window assignments:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Assign window to user
// router.post("/assign-window", async (req, res) => {
//   const { email, windowNumber } = req.body;
//   const db = getDb();

//   try {
//     // Check if window is already assigned
//     const existingAssignment = await db
//       .collection("windowAssignments")
//       .findOne({ windowNumber: windowNumber });

//     if (existingAssignment) {
//       return res.status(400).json({ message: "Window already assigned" });
//     }

//     // Assign window to user
//     await db.collection("windowAssignments").insertOne({
//       email,
//       windowNumber,
//       assignedAt: new Date(),
//     });

//     res.status(200).json({ message: "Window assigned successfully" });
//   } catch (error) {
//     console.error("Error assigning window:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Release window assignment
// router.post("/release-window", async (req, res) => {
//   const { email, windowNumber } = req.body;
//   const db = getDb();

//   console.log("Received release request for:", { email, windowNumber }); // Debug log

//   try {
//     // Try to find the assignment first
//     const assignment = await db
//       .collection("windowAssignments")
//       .findOne({ email });

//     console.log("Found assignment:", assignment); // Debug log

//     if (!assignment) {
//       console.log("No assignment found for email:", email); // Debug log
//       return res
//         .status(404)
//         .json({ message: "No window assigned to this user" });
//     }

//     // Release window assigned to this user
//     const result = await db
//       .collection("windowAssignments")
//       .deleteOne({ email });

//     console.log("Delete operation result:", result); // Debug log

//     if (result.deletedCount === 0) {
//       return res
//         .status(404)
//         .json({ message: "Failed to release window, assignment not found" });
//     }

//     res.status(200).json({ message: "Window released successfully" });
//   } catch (error) {
//     console.error("Error releasing window:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// Add this new route to reset all window assignments
// router.post("/reset-all-windows", async (req, res) => {
//   const db = getDb();

//   try {
//     console.log("Attempting to reset all window assignments");

//     // Delete all window assignments
//     const result = await db.collection("windowAssignments").deleteMany({});

//     console.log("Reset result:", result);

//     res.status(200).json({
//       message: "All window assignments have been reset",
//       deletedCount: result.deletedCount,
//     });
//   } catch (error) {
//     console.error("Error resetting window assignments:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

module.exports = router;
