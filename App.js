import { useState } from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity,
  FlatList, Alert, SafeAreaView, StatusBar, Platform
} from 'react-native';

const CATEGORIAS = ['Análisis', 'Diseño', 'Código'];

export default function App() {
  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [tareas, setTareas] = useState([]);
  const [error, setError] = useState('');

  // agregar con validación
  const agregarTarea = () => {
  if (titulo.trim() === '') {
    setError('Escribe un título para la tarea.');
    return;
  }
  if (categoria === '') {
    setError('Selecciona una categoría.');
    return;
  }
  const nueva = {
    id: Date.now().toString(),
    titulo: titulo.trim(),
    categoria,
    completada: false,
  };
  setTareas([...tareas, nueva]);
  setTitulo('');
  setCategoria('');
  setError('');
};

  // alternar estado
  const cambiarEstado = (id) => {
    setTareas(tareas.map((t) =>
      t.id === id ? { ...t, completada: !t.completada } : t
    ));
  };

  // eliminar solo la seleccionada
  const eliminarTarea = (id) => {
    setTareas(tareas.filter((t) => t.id !== id));
  };

  //indicadores calculados
  const total = tareas.length;
  const completadas = tareas.filter((t) => t.completada).length;
  const pendientes = total - completadas;

  const renderTarea = ({ item }) => (
    <View style={[styles.card, item.completada && styles.cardOk]}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.cardTitulo, item.completada && styles.tachado]}>
          {item.titulo}
        </Text>
        <Text style={styles.cardInfo}>
          {item.categoria} • {item.completada ? 'Completada' : 'Pendiente'}
        </Text>
      </View>
      <TouchableOpacity style={styles.btnEstado} onPress={() => cambiarEstado(item.id)}>
        <Text style={styles.btnTxt}>{item.completada ? 'Reabrir' : 'Completar'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnEliminar} onPress={() => eliminarTarea(item.id)}>
        <Text style={styles.btnTxt}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

     
      <View style={styles.header}>
        <Text style={styles.titulo}>Mis Tareas ADSO</Text>
        <Text style={styles.sub}>Aprendiz: Jenifer Tatiana Pardo</Text>
        <Text style={styles.sub}>Ficha: 3409609</Text>
      </View>

      <View style={styles.resumen}>
        <Text style={styles.resItem}>Total: {total}</Text>
        <Text style={styles.resItem}>Pendientes: {pendientes}</Text>
        <Text style={styles.resItem}>Completadas: {completadas}</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Título de la tarea"
          value={titulo}
          onChangeText={setTitulo}
        />
        <View style={styles.categorias}>
          {CATEGORIAS.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.chip, categoria === cat && styles.chipActivo]}
              onPress={() => setCategoria(cat)}
            >
              <Text style={[styles.chipTxt, categoria === cat && styles.chipTxtActivo]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {error !== '' && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity style={styles.btnAgregar} onPress={agregarTarea}>
          <Text style={styles.btnTxt}>Agregar tarea</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tareas}
        keyExtractor={(item) => item.id}
        renderItem={renderTarea}
        ListEmptyComponent={
          <Text style={styles.vacio}>Todavía no hay tareas registradas.</Text>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F5F3FF', 
    paddingTop: StatusBar.currentHeight || 40, 
    paddingHorizontal: 16 
  },

  header: { 
    alignItems: 'center', 
    marginBottom: 12, 
    backgroundColor: '#6D28D9', 
    padding: 14, 
    borderRadius: 12 
  },

  titulo: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    color: '#FFFFFF' 
  },

  sub: { 
    fontSize: 14, 
    color: '#EDE9FE' 
  },

  resumen: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    backgroundColor: '#FFFFFF', 
    padding: 12, 
    borderRadius: 10, 
    marginBottom: 12, 
    borderWidth: 1, 
    borderColor: '#DDD6FE' 
  },

  resItem: { 
    fontWeight: '700', 
    color: '#4C1D95' 
  },

  form: { 
    backgroundColor: '#FFFFFF', 
    padding: 12, 
    borderRadius: 10, 
    marginBottom: 12, 
    borderWidth: 1, 
    borderColor: '#DDD6FE' 
  },

  input: { 
    borderWidth: 1, 
    borderColor: '#DDD6FE', 
    backgroundColor: '#FAF5FF', 
    color: '#1F1534', 
    borderRadius: 8, 
    padding: 10, 
    marginBottom: 10 
  },

  categorias: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 10 
  },

  chip: { 
    flex: 1, 
    borderWidth: 1, 
    borderColor: '#8B5CF6', 
    borderRadius: 20, 
    padding: 8, 
    marginHorizontal: 3, 
    alignItems: 'center' 
  },

  chipActivo: { 
    backgroundColor: '#6D28D9', 
    borderColor: '#6D28D9' 
  },

  chipTxt: { 
    color: '#6D28D9' 
  },

  chipTxtActivo: { 
    color: '#FFFFFF', 
    fontWeight: 'bold' 
  },

  btnAgregar: { 
    backgroundColor: '#6D28D9', 
    padding: 12, 
    borderRadius: 8, 
    alignItems: 'center' 
  },

  btnTxt: { 
    color: '#FFFFFF', 
    fontWeight: 'bold' 
  },

  card: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFFFFF', 
    padding: 10, 
    borderRadius: 10, 
    marginBottom: 8, 
    borderLeftWidth: 5, 
    borderLeftColor: '#F59E0B', 
    borderWidth: 1, 
    borderColor: '#DDD6FE' 
  },

  cardOk: { 
    borderLeftColor: '#10B981', 
    backgroundColor: '#ECFDF5' 
  },

  cardTitulo: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#1F1534' 
  },

  tachado: { 
    textDecorationLine: 'line-through', 
    color: '#6B5B8C' 
  },

  cardInfo: { 
    fontSize: 12, 
    color: '#6B5B8C' 
  },

  btnEstado: { 
    backgroundColor: '#8B5CF6', 
    padding: 8, 
    borderRadius: 8, 
    marginLeft: 6 
  },

  btnEliminar: { 
    backgroundColor: '#DC2626', 
    padding: 8, 
    borderRadius: 8, 
    marginLeft: 6 
  },

  vacio: { 
    textAlign: 'center', 
    color: '#6B5B8C', 
    marginTop: 20 
  },

  error: { 
    color: '#DC2626', 
    backgroundColor: '#FEF2F2', 
    borderWidth: 1, 
    borderColor: '#FECACA', 
    padding: 8, 
    borderRadius: 8, 
    marginBottom: 10, 
    fontWeight: '600' 
  },
});
