const fs = require('fs');
const path = require('path');
const menuFile = path.resolve(process.env.MENU_DATA_PATH || path.join(__dirname, 'menu.json'));

const getMenu = (req, res) => {
    fs.readFile(menuFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading menu file:', err.message);
            return res.status(500).json({ error: 'Failed to read the menu file.' });
        }

        try {
            const menu = JSON.parse(data);
            res.json(menu);
        } catch (parseError) {
            console.error('Error parsing menu file:', parseError.message);
            res.status(500).json({ error: 'Menu file is corrupted.' });
        }
    });
};

const addMenuItem = (req, res) => {
    const newItem = req.body;

 
    if (!newItem.id || !newItem.name || typeof newItem.price !== 'number' || newItem.price <= 0) {
        return res.status(400).json({ error: 'Invalid menu item data. Ensure id, name, and a positive price are provided.' });
    }

    fs.readFile(menuFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading menu file:', err.message);
            return res.status(500).json({ error: 'Failed to read the menu file.' });
        }

        let menu = [];
        try {
            menu = JSON.parse(data);
        } catch (parseError) {
            console.error('Error parsing menu file:', parseError.message);
            return res.status(500).json({ error: 'Menu file is corrupted.' });
        }

      
        const duplicateItem = menu.find((item) => item.id === newItem.id);
        if (duplicateItem) {
            return res.status(400).json({ error: 'Menu item with this ID already exists.' });
        }

        menu.push(newItem);

        fs.writeFile(menuFile, JSON.stringify(menu, null, 2), (err) => {
            if (err) {
                console.error('Error writing to menu file:', err.message);
                return res.status(500).json({ error: 'Failed to write to the menu file.' });
            }

            res.status(201).json({ message: 'Menu item added successfully.', item: newItem });
        });
    });
};

module.exports = { getMenu, addMenuItem };
