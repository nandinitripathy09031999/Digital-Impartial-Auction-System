import java.util.*;
import java.io.*;
//import configfile.properties;
 class ReadConfigFile {
    public static void main(String args[]) {
        Properties prop=new Properties(); 
        String ad = "D:/DIAS/config.properties";
        try{
        //FileInputStream ip = new FileInputStream(ad);
        FileReader f1 = new FileReader(ad);
        }
        catch(FileNotFoundException f){
                //file not found
        }
        
        // Reader ip;
        prop.load(f1);
        

        // read the key value pair of file
        String str1 = "IP_ADDRESS";
        String Client_address = prop.getProperty(str1);
        f1.close();
    }
}