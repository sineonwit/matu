let currentTable = null;
let ordersByTable = {};

function selectTable(tableNumber) {
    currentTable = tableNumber;
    document.getElementById('menu-header').innerText = 'เมนูสำหรับโต๊ะ ' + tableNumber;
    document.getElementById('menu-section').style.display = 'block';
    document.getElementById('bill-section').style.display = 'none';
}

function orderFood(foodItem, price) {
    if (currentTable !== null) {
        if (!ordersByTable[currentTable]) {
            ordersByTable[currentTable] = { food: [], drinks: [] };
        }
        ordersByTable[currentTable].food.push({ item: foodItem, price: price });
        alert('เพิ่ม ' + foodItem + ' สำหรับโต๊ะ ' + currentTable);
    } else {
        alert('กรุณาเลือกโต๊ะก่อนสั่งอาหาร');
    }
}

function orderDrink(drinkItem, price) {
    if (currentTable !== null) {
        ordersByTable[currentTable].drinks.push({ item: drinkItem, price: price });
        alert('เพิ่ม ' + drinkItem + ' สำหรับโต๊ะ ' + currentTable);
    } else {
        alert('กรุณาเลือกโต๊ะก่อนสั่งเครื่องดื่ม');
    }
}

function finishOrder() {
    if (currentTable !== null) {
        alert('การสั่งสำหรับโต๊ะ ' + currentTable + ' เสร็จสิ้น');
        document.getElementById('menu-section').style.display = 'none';
    } else {
        alert('กรุณาเลือกโต๊ะก่อน');
    }
}

function showBillForCurrentTable() {
    if (currentTable !== null) {
        showBill(currentTable);
    } else {
        alert('กรุณาเลือกโต๊ะก่อน');
    }
}

function showBill(tableNumber) {
    const billDetailsDiv = document.getElementById('bill-details');
    billDetailsDiv.innerHTML = `<h3>โต๊ะ ${tableNumber}</h3>`;
    
    if (ordersByTable[tableNumber]) {
        let total = 0;
        // แสดงรายการอาหาร
        if (ordersByTable[tableNumber].food.length > 0) {
            ordersByTable[tableNumber].food.forEach((order, index) => {
                billDetailsDiv.innerHTML += `<p>${index + 1}. ${order.item} - ${order.price} บาท</p>`;
                total += order.price;
            });
        }

        // แสดงรายการเครื่องดื่ม
        if (ordersByTable[tableNumber].drinks.length > 0) {
            ordersByTable[tableNumber].drinks.forEach((order, index) => {
                billDetailsDiv.innerHTML += `<p>${index + 1}. ${order.item} - ${order.price} บาท</p>`;
                total += order.price;
            });
        }

        billDetailsDiv.innerHTML += `<h4>รวมทั้งหมด: ${total} บาท</h4>`;
        document.getElementById('bill-section').style.display = 'block';
    } else {
        billDetailsDiv.innerHTML += `<p>ไม่มีรายการอาหารหรือเครื่องดื่มสำหรับโต๊ะนี้</p>`;
        document.getElementById('bill-section').style.display = 'block';
    }
}

function payOrder() {
    if (currentTable !== null && ordersByTable[currentTable] && (ordersByTable[currentTable].food.length > 0 || ordersByTable[currentTable].drinks.length > 0)) {
        let total = 0;
        
        // คำนวณยอดรวมจากอาหาร
        ordersByTable[currentTable].food.forEach(order => total += order.price);
        
        // คำนวณยอดรวมจากเครื่องดื่ม
        ordersByTable[currentTable].drinks.forEach(order => total += order.price);

        alert('ยอดชำระทั้งหมดสำหรับโต๊ะ ' + currentTable + ' คือ ' + total + ' บาท');
        ordersByTable[currentTable] = { food: [], drinks: [] }; // ล้างรายการหลังชำระเงิน
        document.getElementById('bill-section').style.display = 'none';
        currentTable = null;
    } else {
        alert('ไม่มีรายการอาหารหรือเครื่องดื่มสำหรับชำระเงิน');
    }
}
