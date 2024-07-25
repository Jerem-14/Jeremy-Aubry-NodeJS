import { Hono } from 'hono';
import {Flipper} from '../models/flipper';
import {Marque} from '../models/marque';
import { isValidObjectId } from 'mongoose';
import multer from 'multer';

// Configuration de multer pour l'upload des images
const upload = multer({ dest: 'uploads/' });

const api = new Hono().basePath('/flippers');

// Route pour obtenir tous les flippers
api.get('/', async (c) => {
  const allFlippers = await Flipper.find({})
  return c.json(allFlippers);
});

// Route pour obtenir un flipper par ID
api.get('/:flipperId', async (c) => {
  const _id = c.req.param('flipperId');

  if (isValidObjectId(_id)) {
    const oneFlipper = await Flipper.findOne({ _id });
    return c.json(oneFlipper);
  }
  return c.json({ msg: 'ObjectId malformed' }, 400);
});

// en head, la req http n'a pas de body response!!
// mais on peut setter des headers à la volée et autant que nécessaire
// c.setHeaders('x-count',1651)

// api.head('/', async (c)=>{
    
    
// })


// Route pour créer un nouveau flipper
api.post('/', upload.single('logo'), async (c) => {
  const body = await c.req.json();
  if (c.req.logo) {
    body.images = { logo: c.req.logo.path };
  }
  try {
    const newFlipper = new Flipper(body);
    const saveFlipper = await newFlipper.save();
    return c.json(saveFlipper, 201);
  } catch (error: unknown) {
    return c.json((error as any)._message, 400);
  }
});

// Route pour ajouter une marque à un flipper
api.post('/:flipperId/marques', async (c) => {
    // on attrape le body qui sera le commentaire
    // on crée le commentaire dans la collection comments
    // on push l'_id dans creations
  const flipperId = c.req.param('flipperId');
  const body = await c.req.json();

  const newMarque = new Marque(body);
  const saveMarque = await newMarque.save();
  const { _id } = saveMarque;
  const q = {
    _id: flipperId
  };
  const updateQuery = {
    $addToSet: {
      marques: _id
    }
  };
  const tryToUpdate = await Flipper.findOneAndUpdate(q, updateQuery, { new: true });
  return c.json(tryToUpdate);
});

// Route pour mettre à jour un flipper
api.put('/:flipperId', upload.single('logo'), async (c) => {
  const _id = c.req.param('flipperId');
  const body = await c.req.json();
  if (c.req.logo) {
    body.images = { logo: c.req.logo.path };
  }
  const q = {
    _id
  };
  const updateQuery = {
    ...body
  };
  const tryToUpdate = await Flipper.findOneAndUpdate(q, updateQuery, { new: true });
  return c.json(tryToUpdate, 200);
});

// Route pour modifier partiellement un flipper
api.patch('/:flipperId', async (c) => {
  const _id = c.req.param('flipperId');
  const body = await c.req.json();
  const q = {
    _id
  };
  const { categories, ...rest } = body;

  const updateQuery = {
    $addToSet: {
      categories: categories
    },
    $set: { ...rest }
  };
  const tryToUpdate = await Flipper.findOneAndUpdate(q, updateQuery, { new: true });
  return c.json(tryToUpdate, 200);
});

// Route pour supprimer un flipper
api.delete('/:flipperId', async (c) => {
  const _id = c.req.param('flipperId');
  const tryToDelete = await Flipper.deleteOne({ _id });
  const { deletedCount } = tryToDelete;
  if (deletedCount) {
    return c.json({ msg: "DELETE done" });
  }
  return c.json({ msg: "not found" }, 404);
});

export default api;
