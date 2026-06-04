import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BACKGROUND_FETCH_TASK = 'BACKGROUND_FETCH_QUOTE_TASK';

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  try {
    const response = await fetch('https://dummyjson.com/quotes/random');
    const data = await response.json();
    
    if (data && data.quote) {
      const quotePayload = {
        text: data.quote,
        author: data.author,
        time: new Date().toLocaleTimeString(),
      };
      
      await AsyncStorage.setItem('@stored_quote', JSON.stringify(quotePayload));
      return BackgroundFetch.BackgroundFetchResult.NewData;
    }
    return BackgroundFetch.BackgroundFetchResult.NoData;
  } catch (error) {
    console.error("Gagal mengambil quote di background:", error);
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

export const registerQuoteTask = async () => {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 15 * 60, 
    stopOnTerminate: false,   
    startOnBoot: true,        
  });
};