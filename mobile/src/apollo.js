import ApolloClient, { InMemoryCache } from "apollo-boost";
import { AsyncStorage } from "react-native";
import { persistCache } from "apollo-cache-persist";

// note: this may not work on android, you will probably have to put your IP address here
// const address = "http://localhost:5000/graphql";

// ***** Radim na android emulatoru
// ***** 10.0.2.2	Special alias to your host loopback interface
// ***** (i.e., 127.0.0.1 on your development machine)
// ***** https://developer.android.com/studio/run/emulator-networking.html
const address = "http://10.0.2.2:5000/graphql";

const cache = new InMemoryCache();

persistCache({
  cache,
  storage: AsyncStorage
});

export default new ApolloClient({
  uri: address,
  cache
});
