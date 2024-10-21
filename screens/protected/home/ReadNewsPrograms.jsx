import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Share, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from "@expo/vector-icons";
import WebView from 'react-native-webview';
import moment from 'moment';

const ReadNewsProgramsScreen = ({ navigation, route }) => {
  const newsItem = route.params?.newsItem;
  const [webViewHeight, setWebViewHeight] = useState(0);

  if (!newsItem) {
    return (
      <View style={styles.container}>
        <Text>Error: No news item found.</Text>
      </View>
    );
  }

  const onShare = async () => {
    try {
      await Share.share({
        message: `Check out this article on NiyogHub: ${newsItem.title}`,
        url: `https://niyoghub-server.onrender.com/uploads/images/${newsItem.image}`,
        title: newsItem.title,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const screenWidth = Dimensions.get('window').width;


  const htmlContent = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body {
        font-size: 16px;
        color: #333;
        line-height: 1.6;
        padding: 10px;
        margin: 0;
        box-sizing: border-box;
      }
      h1, h2, h3, h4, h5, h6 {
        font-weight: bold;
        color: #537F19;
        margin-top: 1.2em;
        margin-bottom: 0.5em;
      }
      h1 { font-size: 24px; }
      h2 { font-size: 22px; }
      h3 { font-size: 20px; }
      h4 { font-size: 18px; }
      h5 { font-size: 16px; }
      h6 { font-size: 14px; }
      p {
        font-size: 16px;
        margin-bottom: 1.2em;
      }
      a {
        color: #537F19;
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
      img {
        max-width: 100%;
        height: auto;
        border-radius: 8px;
        margin-bottom: 1.5em;
      }
      ul, ol {
        margin-left: 1.5em;
        margin-bottom: 1.2em;
      }
      li {
        margin-bottom: 0.6em;
      }
      blockquote {
        margin: 1.2em 0;
        padding-left: 1em;
        border-left: 4px solid #cccccc;
        color: #666;
        font-style: italic;
        background-color: #f9f9f9;
        padding: 0.5em 1em;
      }
      pre {
        background-color: #f0f0f0;
        padding: 10px;
        border-radius: 4px;
        overflow-x: auto;
        margin-bottom: 1.2em;
      }
      code {
        font-family: monospace;
        background-color: #f0f0f0;
        padding: 2px 4px;
        border-radius: 4px;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 1.5em;
      }
      th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
      }
      th {
        background-color: #f2f2f2;
      }
      hr {
        border: none;
        border-top: 1px solid #ddd;
        margin: 1.5em 0;
      }
      strong {
        font-weight: bold;
      }
      em {
        font-style: italic;
      }
      .ql-align-center {
        text-align: center;
      }
      .ql-align-right {
        text-align: right;
      }
      .ql-size-small {
        font-size: 0.75em;
      }
      .ql-size-large {
        font-size: 1.5em;
      }
      .ql-size-huge {
        font-size: 2.5em;
      }
    </style>
  </head>
  <body>
    ${newsItem.content}
  </body>
</html>
`;


  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Image
          source={require("../../../assets/niyoghub_banner_1.png")}
          style={styles.headerImage}
        />
        <Ionicons name="settings-outline" size={24} color="transparent" />
      </View>

      {/* Article Content */}
      <ScrollView style={styles.container}>
        <View style={styles.postContainer}>
          <Image
            source={{ uri: `https://niyoghub-server.onrender.com/uploads/images/${newsItem.image}` }}
            style={styles.newsImage}
          />
          <Text style={styles.categoryText}>News & Programs</Text>
          <Text style={styles.titleText}>{newsItem.title}</Text>
          <Text style={styles.subtitleText}>{newsItem.subtitle}</Text>
          <Text style={styles.dateText}>{moment(newsItem.createdAt).format('MMMM D, YYYY')}</Text>

          {/* render html content using WebView */}
          <View style={styles.webViewContainer}>
            <WebView
              originWhitelist={['*']}
              source={{ html: htmlContent }}
              style={[styles.webView, { height: webViewHeight }]}
              onMessage={(event) => {
                // height based on the content height
                setWebViewHeight(Number(event.nativeEvent.data));
              }}
              injectedJavaScript="window.ReactNativeWebView.postMessage(document.body.scrollHeight)"
              javaScriptEnabled={true}
              automaticallyAdjustContentInsets={false}
            />
          </View>

          <TouchableOpacity style={styles.shareButton} onPress={onShare}>
            <Text style={styles.shareButtonText}>Share Article</Text>
            <Ionicons name="share-social-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default ReadNewsProgramsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#F0F0F0",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    paddingTop: 40,
  },
  headerImage: {
    width: 150,
    height: 50,
    resizeMode: "contain",
  },
  postContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  newsImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  categoryText: {
    fontSize: 14,
    color: '#537F19',
    marginTop: 5,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  subtitleText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#666',
    marginTop: 5,
  },
  dateText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  webViewContainer: {
    flex: 1,
    marginTop: 15,
    marginBottom: 20,
  },
  webView: {
    width: '100%',
  },
  shareButton: {
    flexDirection: 'row',
    backgroundColor: '#537F19',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  shareButtonText: {
    color: 'white',
    fontSize: 14,
    marginRight: 10,
  },
});
