import org.apache.zookeeper.ZooKeeper;
import org.apache.zookeeper.Watcher;
import java.io.IOException;
public class LeaderElection implements Watcher
{
    private static final String ZOOKEEPER_ADDRESS="localhost:2181";
    private static final int SESSION_TIMEOUT=3000;
    private ZooKeeper zooKeeper;
    private String currentZnodeName;
    private static final String ELECTION_NAMESPACE= "/election";
    public static void main(String args[]) throws IOException, InterruptedException
    {
        LeaderElection leaderElection = new LeaderElection();
        leaderElection.connectToZookeeper();
        leaderElection.volunteerForLeadership();
        leaderElection.electLeader();
        leaderElection.run();
        leaderElection.close();
        System.out.println("Disconnected from Zookeeper, Exiting from Application");

    }
    public void connectToZookeeper() throws IOException
    {
        this.zooKeeper= new ZooKeeper(ZOOKEEPER_ADDRESS,SESSION_TIMEOUT, watcher: this)
    }

    public void run() throws InterruptedException
    {
        synchronized(zooKeeper)
        {
            zooKeeper.wait();
        }
    }

    public void volunteerForLeadership()
    {
        String znodePrefix = ELECTION_NAMESPACE + "/c_";
        String znodeFullPath = zooKeeper.create(znodePrefix, new byte []{}, ZooDefs.Ids.OPEN_ACL_UNSAFE,CreateMode.EPHEMERAL_SEQUENTIAL);
        System.out.println("znode name "+ znodeFullPath);
        this.currentZnodeName= znodeFullPath.replace( target: ELECTION_NAMESPACE+ "/", replacement: "");
    }
    
    public void reelectLeader() throws KeeperException, InterruptedException
    {
        Stat predecessorStat = null;
        String predecessorZnodeName="";
        while(predecessorStat == null)
        {
            
        List<String>children = zooKeeper.getChildren(ELECTION_NAMESPACE, watch: false);

        Collections.sort(children);
        String smallestChild=children.get(0);
    
        if(smallestChild.equals(currentZnodeName))
        {
            System.out.println("I am the Leader ");
            return;
        }
        else{
            System.out.println("I am not the leader");
            int predecessorIndex = Collections.binarySearch(children, currentZnodeName) -1;
            predecessorZnodeName = children.get(predecessorIndex);
            predecessorStat = zooKeeper.exists(ELECTION_NAMESPACE + "/"+ predecessorZnodeName, watcher: this);

        }
        }

        System.out.println(" watching znode "+ predecessorZnodeName);


        
       
    }

    public void close() throws InterruptedException
    {
        zooKeeper.close();
    }

    @Override
    public void process(WatchedEvent event)
    {
        switch(event.getType())
        {
            case None:
            if(event.getState() == Event.KeeperState.SyncConnected)
            {
                System.out.println("Succcesfully Connected to Zookeeper ! ");
            }
            else
            {
                synchronized(zooKeeper)
                {
                    System.out.println("Disconnected from event !");
                    zooKeeper.notifyAll();
                }
            }
            break;

            case NodeDeleted:
            try {
                reelectLeader();
                } catch (KeeperException e) { }
                  catch(InterruptedException e){ }
        }
    }
}