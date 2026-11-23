
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ShoppingBag,
  Menu,
  X,
  Instagram,
  ArrowRight,
  Plus,
  Minus
} from 'lucide-react';

import './style.css';

const products = [
  {
    id: 1,
    name: 'Shorts Alfaiataria Clássico',
    category: 'Shorts',
    price: 89.90,
    color: 'Off-white',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=85',
    tag: 'Mais vendido'
  },
  {
    id: 2,
    name: 'Conjunto Elegance',
    category: 'Conjuntos',
    price: 189.90,
    color: 'Bege',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=85',
    tag: 'Novo'
  },
  {
    id: 3,
    name: 'Shorts Alfaiataria Premium',
    category: 'Shorts',
    price: 99.90,
    color: 'Preto',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=85'
  },
  {
    id: 4,
    name: 'Conjunto Linho Chic',
    category: 'Conjuntos',
    price: 199.90,
    color: 'Rosa blush',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85'
  }
];

function App() {
  const [cart, setCart] = useState([]);
  const [cat, setCat] = useState('Todos');
  const [menu, setMenu] = useState(false);
  const [msg, setMsg] = useState('');

  const shown =
    cat === 'Todos'
      ? products
      : products.filter(p => p.category === cat);

  const count = cart.reduce((a, i) => a + i.qty, 0);

  const total = cart.reduce(
    (a, i) => a + i.price * i.qty,
    0
  );

  function add(p) {
    setCart(a =>
      a.some(i => i.id === p.id)
        ? a.map(i =>
            i.id === p.id
              ? { ...i, qty: i.qty + 1 }
              : i
          )
        : [...a, { ...p, qty: 1 }]
    );

    setMsg('Adicionado à sacola');
    setTimeout(() => setMsg(''), 2200);
  }

  function qty(id, d) {
    setCart(a =>
      a
        .map(i =>
          i.id === id
            ? { ...i, qty: i.qty + d }
            : i
        )
        .filter(i => i.qty > 0)
    );
  }

  const wa =
    'https://wa.me/?text=' +
    encodeURIComponent(
      'Olá! Vim pelo site da SL Collection e gostaria de atendimento.'
    );

  return (
    <>
      <div className="announce">
        ELEGÂNCIA EM CADA DETALHE · CONHEÇA A NOVA COLEÇÃO
      </div>

      <header>
        <button
          className="mobile icon"
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X /> : <Menu />}
        </button>

        <a className="logo" href="#">
          <b>SL</b>
          <small>COLLECTION</small>
        </a>

        <nav className={menu ? 'open' : ''}>
          {['Início', 'Novidades', 'Shorts', 'Conjuntos', 'Sobre'].map(n => (
            <a
              key={n}
              href={n === 'Sobre' ? '#sobre' : '#colecao'}
              onClick={() => setMenu(false)}
            >
              {n}
            </a>
          ))}
        </nav>

        <button
          className="icon bag"
          onClick={() =>
            document.getElementById('cart').showModal()
          }
        >
          <ShoppingBag />
          <i>{count}</i>
        </button>
      </header>

      <main>
        <section className="hero">
          <div className="heroText">
            <label>NOVA COLEÇÃO · SL COLLECTION</label>

            <h1>
              Seu estilo,
              <br />
              <em>sua essência.</em>
            </h1>

            <p>
              Peças que traduzem elegância, personalidade
              e a beleza de ser você.
            </p>

            <a className="btn dark" href="#colecao">
              COMPRE AGORA <ArrowRight size={16} />
            </a>
          </div>

          <div className="heroImg">
            <img
              src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1300&q=90"
              alt="Moda feminina"
            />

            <span>
              SL
              <small>COLLECTION</small>
            </span>
          </div>
        </section>

        <div className="motto">
          ✳ Moda para acompanhar você em todos os momentos. ✳
        </div>

        <section className="collection" id="colecao">
          <div className="heading">
            <div>
              <label>ESCOLHIDOS PARA VOCÊ</label>
              <h2>
                Favoritos da <em>coleção</em>
              </h2>
            </div>

            <a href="#produtos">VER TODOS ↗</a>
          </div>

          <div className="filters">
            {['Todos', 'Shorts', 'Conjuntos'].map(c => (
              <button
                key={c}
                className={cat === c ? 'active' : ''}
                onClick={() => setCat(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="products" id="produtos">
            {shown.map(p => (
              <article key={p.id}>
                <div className="photo">
                  <img src={p.image} alt={p.name} />

                  {p.tag && (
                    <span className="tag">{p.tag}</span>
                  )}

                  <button onClick={() => add(p)}>
                    ＋ Adicionar à sacola
                  </button>
                </div>

                <div className="details">
                  <div>
                    <h3>{p.name}</h3>
                    <p>{p.color}</p>
                  </div>

                  <b>
                    R$ {p.price.toFixed(2).replace('.', ',')}
                  </b>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="story" id="sobre">
          <img
            src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1100&q=85"
            alt="Moda feminina SL Collection"
          />

          <div>
            <label>UM JEITO DE SER</label>

            <h2>
              Vista o que faz
              <br />
              você <em>florescer.</em>
            </h2>

            <p>
              A SL Collection acredita que estilo é expressão.
              Selecionamos peças versáteis e cheias de personalidade
              para você se sentir confiante em cada ocasião.
            </p>

            <a href="#colecao">
              DESCUBRA A COLEÇÃO ↗
            </a>
          </div>
        </section>

        <section className="newsletter">
          <label>FIQUE POR DENTRO</label>

          <h2>Novidades que combinam com você.</h2>

          <p>
            Acompanhe a SL Collection e descubra primeiro
            nossos lançamentos.
          </p>

          <a className="btn pink" href={wa}>
            FALE COM A GENTE ↗
          </a>
        </section>
      </main>

      <footer>
        <a className="logo foot" href="#">
          <b>SL</b>
          <small>COLLECTION</small>
        </a>

        <p>Seu estilo, sua essência.</p>

        <div>
          <a href="https://instagram.com/" target="_blank" rel="noreferrer">
            <Instagram size={15} /> Instagram
          </a>

          <a href={wa}>WhatsApp</a>
        </div>

        <small>
          © 2026 SL COLLECTION · TODOS OS DIREITOS RESERVADOS
        </small>
      </footer>

      <dialog id="cart">
        <div className="cartHead">
          <h2>Sua sacola</h2>

          <button
            className="icon"
            onClick={() =>
              document.getElementById('cart').close()
            }
          >
            <X />
          </button>
        </div>

        {!cart.length ? (
          <p>Sua sacola está vazia.</p>
        ) : (
          <>
            {cart.map(i => (
              <div className="line" key={i.id}>
                <img src={i.image} alt={i.name} />

                <div>
                  <b>{i.name}</b>

                  <p>
                    R$ {i.price.toFixed(2).replace('.', ',')}
                  </p>

                  <button onClick={() => qty(i.id, -1)}>
                    <Minus size={13} />
                  </button>

                  {' '}{i.qty}{' '}

                  <button onClick={() => qty(i.id, 1)}>
                    <Plus size={13} />
                  </button>
                </div>
              </div>
            ))}

            <h3>
              Subtotal: R$ {total.toFixed(2).replace('.', ',')}
            </h3>

            <a
              className="btn dark"
              href={
                'https://wa.me/?text=' +
                encodeURIComponent(
                  'Quero finalizar: ' +
                  cart.map(i => i.qty + 'x ' + i.name).join(', ')
                )
              }
              target="_blank"
              rel="noreferrer"
            >
              FINALIZAR PELO WHATSAPP
            </a>
          </>
        )}
      </dialog>

      {msg && <aside>{msg}</aside>}
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
