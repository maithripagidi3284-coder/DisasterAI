import React, { useState } from 'react';
import MicButton from '../components/MicButton';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';

const DATA: any = {
  flood: [
    { id: '1', title: 'Immediate Steps', text: 'Move to higher ground immediately. Do not walk in moving water. Six inches of moving water can knock you down.' },
    { id: '2', title: 'First Aid - Drowning', text: 'Lay person flat. Tilt head back. Give 2 rescue breaths. 30 chest compressions. Repeat until help arrives.' },
    { id: '3', title: 'Avoid Contaminated Water', text: 'Floodwater contains sewage and chemicals. Do not touch your face. Wash hands with clean water immediately.' },
  ],
  cyclone: [
    { id: '4', title: 'Before Cyclone Hits', text: 'Move indoors immediately. Stay away from windows. Go to the lowest floor interior room.' },
    { id: '5', title: 'After Cyclone', text: 'Do not go outside until authorities confirm it is safe. Watch for fallen power lines.' },
  ],
  earthquake: [
    { id: '6', title: 'During Earthquake', text: 'Drop, cover and hold on. Get under a sturdy table. Stay away from windows and exterior walls.' },
    { id: '7', title: 'After Earthquake', text: 'Check for injuries. Watch for aftershocks. Do not use elevators. Check for gas leaks.' },
  ],
  fire: [
    { id: '8', title: 'Fire Escape', text: 'Get out immediately. Stay low to avoid smoke. Do not use elevators. Meet at designated spot outside.' },
    { id: '9', title: 'If Trapped in Fire', text: 'Close doors between you and fire. Signal from window. Do not jump unless instructed by firefighters.' },
  ],
};

const TRANSLATIONS: any = {
  flood: {
    tel: [
      { id: '1', title: 'తక్షణ చర్యలు', text: 'వెంటనే ఎత్తైన ప్రదేశానికి వెళ్ళండి. కదిలే నీటిలో నడవకండి. ఆరు అంగుళాల నీరు మిమ్మల్ని పడగొట్టవచ్చు.' },
      { id: '2', title: 'ప్రథమ చికిత్స - మునిగిపోవడం', text: 'వ్యక్తిని పడుకోబెట్టండి. తల వెనక్కి వంచండి. 2 శ్వాసలు ఇవ్వండి. 30 గుండె నొక్కులు ఇవ్వండి.' },
      { id: '3', title: 'కలుషిత నీరు నివారించండి', text: 'వరద నీటిలో మురుగు మరియు రసాయనాలు ఉంటాయి. మీ ముఖాన్ని తాకకండి.' },
    ],
    hin: [
      { id: '1', title: 'तत्काल कदम', text: 'तुरंत ऊंची जगह पर जाएं। बहते पानी में न चलें। छह इंच का बहता पानी आपको गिरा सकता है।' },
      { id: '2', title: 'प्राथमिक चिकित्सा - डूबना', text: 'व्यक्ति को सपाट लिटाएं। सिर पीछे झुकाएं। 2 सांसें दें। 30 छाती दबाव दें।' },
      { id: '3', title: 'दूषित पानी से बचें', text: 'बाढ़ के पानी में मल और रसायन होते हैं। अपना चेहरा न छुएं।' },
    ],
  },
  cyclone: {
    tel: [
      { id: '4', title: 'తుఫాను రాకముందే', text: 'వెంటనే లోపలికి వెళ్ళండి. కిటికీల దగ్గర ఉండకండి. అత్యంత లోతైన అంతస్తుకు వెళ్ళండి.' },
      { id: '5', title: 'తుఫాను తర్వాత', text: 'అధికారులు సురక్షితం అని ధృవీకరించే వరకు బయటకు వెళ్ళకండి.' },
    ],
    hin: [
      { id: '4', title: 'चक्रवात से पहले', text: 'तुरंत अंदर जाएं। खिड़कियों से दूर रहें। सबसे नीचे की मंजिल पर जाएं।' },
      { id: '5', title: 'चक्रवात के बाद', text: 'जब तक अधिकारी सुरक्षित न बताएं बाहर न जाएं।' },
    ],
  },
  earthquake: {
    tel: [
      { id: '6', title: 'భూకంపం సమయంలో', text: 'క్రిందకు వంగండి, కప్పుకోండి మరియు పట్టుకోండి. గట్టి మేజా కింద వెళ్ళండి.' },
      { id: '7', title: 'భూకంపం తర్వాత', text: 'గాయాలను తనిఖీ చేయండి. లిఫ్ట్ ఉపయోగించకండి. గ్యాస్ లీకేజీ తనిఖీ చేయండి.' },
    ],
    hin: [
      { id: '6', title: 'भूकंप के दौरान', text: 'नीचे झुकें, ढकें और पकड़ें। मजबूत मेज के नीचे जाएं।' },
      { id: '7', title: 'भूकंप के बाद', text: 'चोटों की जांच करें। लिफ्ट का उपयोग न करें। गैस लीक की जांच करें।' },
    ],
  },
  fire: {
    tel: [
      { id: '8', title: 'అగ్ని నుండి తప్పించుకోవడం', text: 'వెంటనే బయటకు వెళ్ళండి. పొగను నివారించడానికి వంగి నడవండి. లిఫ్ట్ ఉపయోగించకండి.' },
      { id: '9', title: 'అగ్నిలో చిక్కుకుపోతే', text: 'మీకు మరియు అగ్నికి మధ్య తలుపులు మూసివేయండి. కిటికీ నుండి సంకేతం ఇవ్వండి.' },
    ],
    hin: [
      { id: '8', title: 'आग से बचना', text: 'तुरंत बाहर निकलें। धुएं से बचने के लिए नीचे रहें। लिफ्ट का उपयोग न करें।' },
      { id: '9', title: 'आग में फंसे हों तो', text: 'आप और आग के बीच दरवाजे बंद करें। खिड़की से संकेत दें।' },
    ],
  },
};

const LANGUAGES = [
  { code: 'eng', label: 'English' },
  { code: 'tel', label: 'తెలుగు' },
  { code: 'hin', label: 'हिंदी' },
];

function classifyText(text: string): string {
  const t = text.toLowerCase();
  if (t.match(/flood|water|rain|river|drown|వరద|నీరు|बाढ़|पानी/)) return 'flood';
  if (t.match(/cyclone|storm|wind|hurricane|roof|తుఫాను|చक्रवात/)) return 'cyclone';
  if (t.match(/earthquake|quake|tremor|shake|భూకంపం|भूकंप/)) return 'earthquake';
  if (t.match(/fire|burn|smoke|flame|అగ్ని|आग/)) return 'fire';
  return 'flood';
}

function searchChunks(query: string, chunks: any[]): any[] {
  const words = query.toLowerCase().split(/\s+/);
  return chunks
    .map(c => ({
      ...c,
      score: words.filter(w => (c.title + c.text).toLowerCase().includes(w)).length
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [disaster, setDisaster] = useState('');
  const [language, setLanguage] = useState('eng');

  const handleSearch = () => {
    if (!query.trim()) return;
    const type = classifyText(query);
    setDisaster(type.toUpperCase());

    let chunks;
    if (language !== 'eng' && TRANSLATIONS[type] && TRANSLATIONS[type][language]) {
      chunks = TRANSLATIONS[type][language];
    } else {
      chunks = DATA[type] || DATA.flood;
    }

    const top = searchChunks(query, DATA[type]);
    if (language !== 'eng' && TRANSLATIONS[type] && TRANSLATIONS[type][language]) {
      setResults(TRANSLATIONS[type][language].slice(0, 3));
    } else {
      setResults(top);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛟 Disaster Assistant</Text>

      <View style={styles.langRow}>
        {LANGUAGES.map(lang => (
          <TouchableOpacity
            key={lang.code}
            style={[styles.langBtn, language === lang.code && styles.langBtnActive]}
            onPress={() => setLanguage(lang.code)}
          >
            <Text style={[styles.langText, language === lang.code && styles.langTextActive]}>
              {lang.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {disaster ? <Text style={styles.badge}>{disaster}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Describe your emergency..."
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
      />
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
      <MicButton onResult={(text) => {
        setQuery(text);
        handleSearch();
      }} />

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardText}>{item.text}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', paddingTop: 60 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, color: '#2E6DA4' },
  langRow: { flexDirection: 'row', marginBottom: 16, gap: 8 },
  langBtn: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#2E6DA4' },
  langBtnActive: { backgroundColor: '#2E6DA4' },
  langText: { color: '#2E6DA4', fontSize: 14 },
  langTextActive: { color: '#fff', fontWeight: 'bold' },
  badge: { backgroundColor: '#2E6DA4', color: '#fff', padding: 6, borderRadius: 8, marginBottom: 10, alignSelf: 'flex-start', fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 10, fontSize: 16 },
  button: { backgroundColor: '#2E6DA4', padding: 14, borderRadius: 8, alignItems: 'center', marginBottom: 20 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  card: { backgroundColor: '#f0f4f8', padding: 14, borderRadius: 8, marginBottom: 10 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#2E6DA4', marginBottom: 4 },
  cardText: { fontSize: 14, color: '#333', lineHeight: 22 },
});