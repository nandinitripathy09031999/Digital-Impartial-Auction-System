import java.util.*;
import java.io.*;
import java.security.*;
class function3 {
    static double bid_value;
    final int base_value=1000; //predefined base value of the item
    function3(double _bid_value){
        bid_value = _bid_value;
    }
    
    public boolean commit_bid(double bid_value)
    {
        boolean flag =  false;
        if(bid_value == 0 || bid_value<base_value)
        {
            System.out.println("BID CANNOT BE ZERO or LESS THAN BASE VALUE");
        }
        else
        {
             System.out.println("VALUE COMMITED");
             flag = true;
        }
        return(flag);
    }

    public String hash_function(double bid_value) {
        byte[] input =toString(bid_value).getBytes("UTF-8");
        MessageDigest Digest = MessageDigest.getInstance("SHA-256");
        final byte[] digest = Digest.digest(input);
        String hashed_value = bytesToHex(digest);
        return(hashed_value);
    } 

    public HashMap returnDS(HashMap h1){
        return h1;
    }

    public static void main(String args[]){
        Scanner s1 = new Scanner(System.in);
        System.out.println("ENTER THE BID FOR THE ITEM :");
        double bid = s1.nextDouble();
        s1.close();
       
         function3 f1 = new function3(bid); 
        boolean b1 = f1.commit_bid(bid);

            if(b1==true) {
                String hashvalue = f1.hash_function(bid);
                HashMap<Double,String> ds = new HashMap<Double,String>(); 
                ds.put(bid, hashvalue);
        }
    }
}