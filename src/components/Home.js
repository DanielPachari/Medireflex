import React, { useEffect, useState } from 'react';
import { app, auth } from '../credenciales';
import { getAuth, signOut } from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
  setDoc
} from 'firebase/firestore';

const authInstance = getAuth(app);
const db = getFirestore(app);

const Home = ({ correoUsuario }) => {
  const valorInicial = {
    ejercicio: '',
    dificultad: '',
    fecha: ''
  };

  const [user, setUser] = useState(valorInicial);
  const [lista, setLista] = useState([]);
  const [subId, setSubId] = useState('');

  const capturarInputs = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const guardarInfo = async (e) => {
    e.preventDefault();
    if (subId === '') {
      try {
        await addDoc(collection(db, 'user'), {
          ...user
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      await setDoc(doc(db, 'user', subId), {
        ...user
      });
    }

    setUser({ ...valorInicial });
    setSubId('');
  };

  useEffect(() => {
    const getLista = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'user'));
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setLista(docs);
      } catch (error) {
        console.log(error);
      }
    };
    getLista();
  }, [lista]);

  const deleteUsuario = async (id) => {
    await deleteDoc(doc(db, 'user', id));
  };

  const getOne = async (id) => {
    try {
      const docRef = doc(db, 'user', id);
      const docSnap = await getDoc(docRef);
      setUser(docSnap.data());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (subId !== '') {
      getOne(subId);
    }
  }, [subId]);

  return (
    <div className="container mt-5">
      <p>
        Bienvenido, <strong>{correoUsuario}</strong>. Has iniciado sesión{' '}
      </p>

      <button className="btn btn-primary" onClick={() => signOut(auth)}>
        Cerrar Sesión
      </button>
      <hr />

      <div className="row">
        <div className="col-md-4">
          <h2 className="text-center mb-4">Crear Ejercicio</h2>
          <form onSubmit={guardarInfo}>
            <div className="card">
              <div className="card-body">
                <div className="mb-3">
                  <input
                    type="text"
                    name="ejercicio"
                    className="form-control"
                    placeholder="Ingresar el nombre del ejercicio"
                    onChange={capturarInputs}
                    value={user.ejercicio}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    name="dificultad"
                    className="form-control"
                    placeholder="Ingresar la dificultad del ejercicio"
                    onChange={capturarInputs}
                    value={user.dificultad}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    name="fecha"
                    className="form-control"
                    placeholder="Ingresar la fecha del ejercicio"
                    onChange={capturarInputs}
                    value={user.fecha}
                  />
                </div>

                <button className="btn btn-primary">
                  {subId === '' ? 'Guardar' : 'Actualizar'}
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="col-md-8">
          <h2 className="text-center mb-4">Lista de Ejercicios</h2>
          <div className="card">
            <div className="card-body">
              {lista.map((list) => (
                <div key={list.id} className="mb-4">
                  <h5>Ejercicio: {list.ejercicio}</h5>
                  <p>Dificultad: {list.dificultad}</p>
                  <p>Fecha: {list.fecha}</p>
                  <button
                    className="btn btn-danger me-2"
                    onClick={() => deleteUsuario(list.id)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() => setSubId(list.id)}
                  >
                    Actualizar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

