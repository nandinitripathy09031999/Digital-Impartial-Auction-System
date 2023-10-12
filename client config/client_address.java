import java.net.InetAddress;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
class IPAddressExample {
    public static void main(final String args[]) throws Exception, IOException {
        final InetAddress inetAddress = InetAddress.getLocalHost();
        String HostAddress =  inetAddress.getHostAddress();
        Properties props = new Properties();
        try{ props.load(reader);
        
        }
         catch(IOException exception){
            //
        }
        //System.out.println("Host Name:- " + inetAddress.getHostName());
        FileReader reader = new FileReader("config.properties");
        HashMap <String, Integer> map = new HashMap<>(); 
        map.put(HostAddress, 1);
        //file
        FileWriter myWriter = new FileWriter("config.properties"); 
        File configFile = new File("config.properties");
        
        props.setProperty("IP_ADDRESS", HostAddress);
       
       props.store(myWriter, "CLIENT_PROPERTIES");
       myWriter.close();
    }
}