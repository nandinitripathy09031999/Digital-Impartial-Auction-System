import java.io.*;
import java.util.*;
import javax.crypto.*;
import java.security.*;
public class function4 {
    public static void main(String args[]) throws Exception{
        //Signature s1 = Signature.getInstance("");
        KeyPairGenerator keyPairGen = KeyPairGenerator.getInstance("RSA");
        keyPairGen.initialize(1024);
        //Generating the pair of keys
      KeyPair pair = keyPairGen.generateKeyPair();
      Cipher  cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
      //Initializing a Cipher object
      cipher.init(Cipher.ENCRYPT_MODE, pair.getPublic());
      //let 'DS' be the datastructure in which there is bid
      //in our case its hashmap that is made in function3 before
      //therefore ciphering the DS BELOW
      cipher.update(DS);
      //encrypting the data
      byte[] cipherText = cipher.doFinal();	 
      System.out.println(new String(cipherText, "UTF8")); //OUTPUT OF FUNCTION4 that is to be sent to next function
    }
}