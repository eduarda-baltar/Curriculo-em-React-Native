import React from 'react';
import { SafeAreaView, View, Text, Image, FlatList, ScrollView, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';

const resume = {
  photo: require('./assets/photo.jpg'),
  name: 'Maria Eduarda Baltar Esnaty Araujo',
  title: 'Médica Veterinária | Desenvolvedora em formação',
  location: 'Olinda, Brasil',
  email: 'dudabaltaresnaty@hotmail.com',
  phone: '+5581994092575',
  summary: 'Profissional com formação em Medicina Veterinária e interesse em desenvolvimento de software. Experiência em atendimento clínico, e agora estudando React Native e backend.',
  experiences: [
    {
      id: '1',
      role: 'Estágio em Clínica Veterinária',
      company: 'Clínica Veternária de Olinda',
      period: '2021 — 2023',
      description: 'Atendimento a pequenos animais, auxílio em cirurgias e cuidados pós-operatórios.'
    },
    {
      id: '2',
      role: 'Projeto de pesquisa (TCC)',
      company: 'UNINASSAU - Centro Universitário Maurício de Nassau',
      period: '2023',
      description: 'Relato de caso sobre lesão nasofaríngea em felina filhote, incluindo diagnóstico, tratamento e acompanhamento.'
    }
  ],
  skills: ['React Native', 'JavaScript', 'HTML & CSS', 'SQL', 'Atendimento clínico', 'Cirurgias veterinárias', 'Cuidados pós-operatórios']
};

export default function App() {
  const safeOpenURL = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Erro', 'Não foi possível abrir esse link.');
      }
    } catch (err) {
      Alert.alert('Erro', 'Ocorreu um problema ao tentar abrir o link.');
    }
  };

  const openEmail = () => {
    safeOpenURL(`mailto:${resume.email}`);
  };

  const openPhone = () => {
      safeOpenURL(`tel:${resume.phone}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Image source={resume.photo} style={styles.photo} />
          <View style={styles.headerText}>
            <Text style={styles.name}>{resume.name}</Text>
            <Text style={styles.title}>{resume.title}</Text>
            <Text style={styles.location}>{resume.location}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Resumo</Text>
          <Text style={styles.paragraph}>{resume.summary}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Experiência</Text>
          <FlatList
            data={resume.experiences}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.experienceItem}>
                <View style={styles.expHeader}>
                  <Text style={styles.expRole}>{item.role}</Text>
                  <Text style={styles.expPeriod}>{item.period}</Text>
                </View>
                <Text style={styles.expCompany}>{item.company}</Text>
                <Text style={styles.paragraphSmall}>{item.description}</Text>
              </View>
            )}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Habilidades</Text>
          <View style={styles.skillsContainer}>
            {resume.skills.map((s, i) => (
              <View key={i} style={styles.skillBadge}>
                <Text style={styles.skillText}>{s}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Contato</Text>
          <TouchableOpacity onPress={openEmail} style={styles.contactRow}>
            <Text style={styles.contactLabel}>Email:</Text>
            <Text style={styles.contactValue}>{resume.email}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={openPhone} style={styles.contactRow}>
            <Text style={styles.contactLabel}>Telefone:</Text>
            <Text style={styles.contactValue}>{resume.phone}</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F7FA' },
  scroll: { padding: 20, paddingBottom: 40 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  photo: { width: 90, height: 90, borderRadius: 90, marginRight: 14, backgroundColor: '#ddd' },
  headerText: { flex: 1 },
  name: { fontSize: 20, fontWeight: '700' },
  title: { fontSize: 14, color: '#555', marginTop: 4 },
  location: { fontSize: 12, color: '#888', marginTop: 2 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, elevation: 2 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  paragraph: { fontSize: 14, color: '#333', lineHeight: 20 },
  paragraphSmall: { fontSize: 13, color: '#444', lineHeight: 18 },
  experienceItem: { marginBottom: 10 },
  expHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  expRole: { fontWeight: '700' },
  expPeriod: { fontSize: 12, color: '#666' },
  expCompany: { fontSize: 13, color: '#666', marginBottom: 4 },
  skillsContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  skillBadge: { borderWidth: 1, borderColor: '#E6E6F0', borderRadius: 20, paddingVertical: 6, paddingHorizontal: 12, marginRight: 8, marginBottom: 8 },
  skillText: { fontSize: 12 },
  contactRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
  contactLabel: { color: '#666', fontWeight: '600' },
  contactValue: { color: '#1B6EF6' }
});
