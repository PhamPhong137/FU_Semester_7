# MongoDB Commands with Examples

## 1. Insert Documents

- **Command**: `insertOne`, `insertMany`
- **Usage**:
  - Thêm một document mới vào collection.
  - Thêm nhiều documents cùng lúc vào collection.

```javascript
// Insert one document
db.collectionName.insertOne({ name: "John", age: 25, city: "New York" });

// Insert multiple documents
db.collectionName.insertMany([
  { name: "Alice", age: 30, city: "Los Angeles" },
  { name: "Bob", age: 22, city: "Chicago" },
]);
```

## 2. Query Documents

- **Command**: `find`, `findOne`
- **Usage**:
  - Lấy tất cả các document phù hợp với điều kiện.
  - Lấy một document đầu tiên phù hợp với điều kiện.

```javascript
// Find all documents where age is 25
db.collectionName.find({ age: 25 });

// Find one document where name is "Alice"
db.collectionName.findOne({ name: "Alice" });

// Find one document where name is "Alice" and update the age, returning the original document
db.collectionName.findOneAndUpdate(
  { name: "Alice" },
  { $set: { age: 31 } },
  { returnDocument: "before" } // Options: "before" or "after"
);

// Find one document where name is "Alice" and delete it, returning the document
db.collectionName.findOneAndDelete({ name: "Alice" });

// Find one document where name is "Alice" and replace it with a new document, returning the new document
db.collectionName.findOneAndReplace(
  { name: "Alice" },
  { name: "Alice", age: 32, city: "San Francisco" },
  { returnDocument: "after" } // Options: "before" or "after"
);
```

## 3. Update Documents

- **Command**: `updateOne`, `updateMany`
- **Usage**:
  - Cập nhật một document đầu tiên phù hợp với điều kiện.
  - Cập nhật tất cả các documents phù hợp với điều kiện.

```javascript
// Update one document where name is "John"
db.collectionName.updateOne({ name: "John" }, { $set: { age: 26 } });

// Update all documents where city is "Chicago"
db.collectionName.updateMany(
  { city: "Chicago" },
  { $set: { city: "San Francisco" } }
);
// Replace one document where name is "John" with a new document
db.collectionName.replaceOne(
  { name: "John" },
  { name: "John", age: 27, city: "Miami" } // New document completely replaces the old one
);
```

## 4. Delete Documents

- **Command**: `deleteOne`, `deleteMany`
- **Usage**:
  - Xóa một document đầu tiên phù hợp với điều kiện.
  - Xóa tất cả các documents phù hợp với điều kiện.

```javascript
// Delete one document where name is "Alice"
db.collectionName.deleteOne({ name: "Alice" });

// Delete all documents where age is less than 25
db.collectionName.deleteMany({ age: { $lt: 25 } });
```

## 5. Counting Documents

- **Command**: `countDocuments`
- **Usage**: Đếm số lượng documents phù hợp với điều kiện.

```javascript
// Count all documents where city is "New York"
db.collectionName.countDocuments({ city: "New York" });
```

## 6. Sorting Results

- **Command**: `sort`
- **Usage**: Sắp xếp các documents dựa trên trường cụ thể.

```javascript
// Find all documents and sort by age in ascending order
db.collectionName.find().sort({ age: 1 });

// Sort by age in descending order
db.collectionName.find().sort({ age: -1 });
```

## 7. Limiting and Skipping Results

- **Command**: `limit`, `skip`
- **Usage**: Giới hạn số lượng documents trả về và bỏ qua một số lượng nhất định.

```javascript
// Limit the result to 5 documents
db.collectionName.find().limit(5);

// Skip the first 3 documents and limit to 5
db.collectionName.find().skip(3).limit(5);
```

## 8. Aggregation

- **Command**: `aggregate`
- **Usage**: Thực hiện thao tác phức tạp trên documents (tổng hợp, đếm, nhóm).

```javascript
// Group by city and count the number of documents in each group
db.collectionName.aggregate([{ $group: { _id: "$city", total: { $sum: 1 } } }]);
```

## 9. Comparison Operators in Queries 
    $gt: Lớn hơn (greater than).
    $lt: Nhỏ hơn (less than).
    $gte: Lớn hơn hoặc bằng (greater than or equal to).
    $lte: Nhỏ hơn hoặc bằng (less than or equal to).
    $ne: Không bằng (not equal to).
    $in: Có trong danh sách (in array).
    $nin: Không có trong danh sách (not in array).
```javascript
    // Find all documents where age is greater than 30
    db.collectionName.find({ age: { $gt: 30 } });

    // Find all documents where age is less than 25
    db.collectionName.find({ age: { $lt: 25 } });

    // Find all documents where age is greater than or equal to 20
    db.collectionName.find({ age: { $gte: 20 } });

    // Find all documents where age is less than or equal to 40
    db.collectionName.find({ age: { $lte: 40 } });

    // Find all documents where city is not "Chicago"
    db.collectionName.find({ city: { $ne: "Chicago" } });

    // Find all documents where age is either 25 or 30
    db.collectionName.find({ age: { $in: [25, 30] } });

    // Find all documents where city is neither "New York" nor "San Francisco"
    db.collectionName.find({ city: { $nin: ["New York", "San Francisco"] } });
```

---

Chú thích:

- `collectionName` là tên của collection mà bạn đang thao tác.
- `$set`, `$lt`, `$sum` là các toán tử của MongoDB.
