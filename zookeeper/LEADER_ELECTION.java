import org.apache.zookeeper.ZooKeeper;
import org.apache.zookeeper.Watcher;
import java.io.IOException;
public class LeaderElection implements Watcher
{
    private static final String ZOOKEEPER_ADDRESS="localhost:2181";
    private static final int SESSION_TIMEOUT=3000;
    private ZooKeeper zooKeeper;
    public static void main(String args[]) throws IOException
    {
        
    }
    public void connectToZookeeper() throws IOException
    {
        this.zooKeeper= new ZooKeeper(ZOOKEEPER_ADDRESS,SESSION_TIMEOUT, watcher: this)
    }

    @Override
    public void process(WatchedEvent event)
    {
        switch()
    }
}