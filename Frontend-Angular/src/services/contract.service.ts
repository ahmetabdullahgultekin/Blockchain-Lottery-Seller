import {Injectable} from '@angular/core';
import Web3 from "web3";
import Web3Modal from "web3modal";
import {Subject} from 'rxjs';
import {uContract_abi, uContract_address} from '../abis';
import {TimerService} from './timer.service';


@Injectable({
  providedIn: 'root'
})
export class ContractService {

  uContract: any;
  currentAccount = '';
  private web3js: any;
  private provider: any;
  private accounts: any;
  web3Modal
  balance: any;

  private accountStatusSource = new Subject<any>();
  accountStatus$ = this.accountStatusSource.asObservable();

  constructor(private timerService: TimerService) {
    const providerOptions = {
      walletconnect: {
        package: Web3, // required
        options: {
          infuraId: "INFURA_ID" // required
        }
      }
    };

    this.web3Modal = new Web3Modal({
      network: "mainnet", // optional
      cacheProvider: true, // optional
      providerOptions, // required
      theme: {
        background: "rgb(39, 49, 56)",
        main: "rgb(199, 199, 199)",
        secondary: "rgb(136, 136, 136)",
        border: "rgba(195, 195, 195, 0.14)",
        hover: "rgb(16, 26, 32)"
      }
    });
  }

  async connectAccount() {
    this.web3Modal.clearCachedProvider();

    this.provider = await this.web3Modal.connect(); // set provider
    this.web3js = new Web3(this.provider); // create web3 instance
    this.accounts = await this.web3js.eth.getAccounts();
    this.currentAccount = this.accounts[0];
    this.accountStatusSource.next(this.accounts);
  }

  async getBalance() {
    try {
      this.provider = await this.web3Modal.connect(); // set provider
      this.web3js = new Web3(this.provider); // create web3 instance
      this.accounts = await this.web3js.eth.getAccounts();
      this.uContract = new this.web3js.eth.Contract(uContract_abi, uContract_address);

      return await this.uContract
        .methods.getBalance().call();
    } catch (error) {
      console.log(error);
    }
  }

  async purchaseTicket(hash: number) {
    try {
      this.provider = await this.web3Modal.connect(); // set provider
      this.web3js = new Web3(this.provider); // create web3 instance
      this.accounts = await this.web3js.eth.getAccounts();

      this.uContract = new this.web3js.eth.Contract(uContract_abi, uContract_address);

      return await this.uContract
        .methods.purchaseTicket(hash).send({
          from: this.accounts[0],
          value: this.web3js.utils.toWei('0.001', 'ether')
        });
    } catch (error) {
      console.log(error);
    }
  }

  async learnStage() {
    try {
      this.provider = await this.web3Modal.connect(); // set provider
      this.web3js = new Web3(this.provider); // create web3 instance
      this.accounts = await this.web3js.eth.getAccounts();

      this.uContract = new this.web3js.eth.Contract(uContract_abi, uContract_address);

      this.timerService.stage = await this.uContract
        .methods.learnStage().call({
          from: this.accounts[0]
        });
    } catch (error) {
      console.log(error);
    }
  }


}
