//struct iphdr*ip_header = (struct iphdr*)skb_network_header(skb);
//unsigned int src_ip = (unsigned int)ip_header->saddr;
//unsigned int dest_ip = (unsigned int)ip_header->daddr;

//struct udphdr*udp_header = (struct udphdr*)skb_transport_header(skb);
//src_port = (unsigned int)ntohs(udp_header->source);
//dest_port = (unsigned int)ntohs(udp_header->dest);


#include <sys/socket.h>
#include <sys/types.h>
#include <netinet/in.h>
#include <netdb.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>
#include <errno.h>
#include <arpa/inet.h> 

int main(int argc, char *argv[])
{
    int sockfd = 0, connfd = 0;
    struct sockaddr_in serv_addr; 
	
	char* s= "Caroline_and_Katy_bonus";
    char sendBuff[1025];
   

    if((sockfd = socket(AF_INET, SOCK_STREAM, 0)) < 0)
    {
        printf("\n Error : Could not create socket \n");
        return 1;
    } 

    memset(&serv_addr, '0', sizeof(serv_addr));
    memset(sendBuff, '0', sizeof(sendBuff)); 

    serv_addr.sin_family = AF_INET;
    serv_addr.sin_addr.s_addr = htonl(206.189.233.11);
    serv_addr.sin_port = htons(8088); 

	if( connect(sockfd, (struct sockaddr *)&serv_addr, sizeof(serv_addr)) < 0)
    {
       printf("\n Error : Connect Failed \n");
       return 1;
    } 


    //listen(listenfd, 10); 


	connfd = accept(sockfd, (struct sockaddr*)NULL, NULL); 

	snprintf(sendBuff, sizeof(sendBuff), "%s\n", s);
	write(connfd, sendBuff, strlen(sendBuff)); 

	close(connfd);

}