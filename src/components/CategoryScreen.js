import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { id: 1, name: 'Дети', icon: 'children.svg' },
  { id: 2, name: 'Женщины', icon: 'women.svg' },
  { id: 3, name: 'Мужчины', icon: 'men.svg' },
  { id: 4, name: 'Пары', icon: 'couples.svg' },
  { id: 5, name: 'Группы', icon: 'groups.svg' },
  { id: 6, name: 'Свадебные', icon: 'wedding.svg' },
  { id: 7, name: 'Гламур', icon: 'glamour.svg' },
];

function CategoryScreen() {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Link to="/" style={styles.backButton}>
          <img src="/images/app/back.svg" alt="Назад" style={styles.backIcon} />
        </Link>
        <h1 style={styles.title}>Категории</h1>
      </div>
      <div style={styles.grid}>
        {categories.map(category => (
          <Link to={`/pose-preview/${category.id}`} key={category.id} style={styles.item}>
            <img src={`/images/app/${category.icon}`} alt={category.name} style={styles.icon} />
            <span style={styles.text}>{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#fff', // белый фон для всего контейнера
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    width: '100%',
    maxWidth: '300px',
    margin: '0 auto',
  },
  backButton: {
    flex: '0 0 25%',
    textAlign: 'left',
  },
  backIcon: {
    width: '50px', // такая же ширина, как и у других иконок
    height: '50px', // такая же высота, как и у других иконок
  },
  title: {
    flex: '0 0 75%',
    fontSize: '36px', // тот же размер шрифта, что и на стартовой странице
    fontFamily: 'Georgia, serif', // тот же шрифт, что и на стартовой странице
    textAlign: 'center',
  },
  grid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    alignItems: 'center',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    border: '2px solid rgb(101, 98, 94)',
    borderRadius: '5px',
    textDecoration: 'none',
    color: '#000',
    width: '80%',
    maxWidth: '300px',
    backgroundColor: 'rgb(247, 243, 238)',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
  icon: {
    width: '50px',
    height: '50px',
    marginRight: '10px',
  },
  text: {
    fontSize: '30px',
    fontFamily: 'Georgia, serif',
    flex: 1,
    textAlign: 'center',
  },
};

export default CategoryScreen;
