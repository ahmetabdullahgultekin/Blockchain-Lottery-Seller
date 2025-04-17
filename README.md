# Blockchain Lottery Seller

*A commit‑reveal Ethereum lottery dApp with an Angular front‑end*

This repository implements a fully–decentralised lottery where anyone can **sell tickets**, provably pick a random winner on‑chain, and let winners claim their prizes—no trusted third‑party required.

* **Smart‑contract:** Solidity 0.8 – `Lottery.sol`  
* **Front‑end:** Angular 18 + Web3.js + Web3Modal  
* **Network:** any EVM chain (tested on Sepolia & Hardhat)

---

## ✨ How it Works

1. **Create a lottery** – the deployer (admin) defines  
   * ticket fee (wei) – default `0.0007 ETH`  
   * *purchase window*  (days)  
   * *decide window*     (days)

2. **Ticket purchase (commit phase)**  
   Users send exactly the ticket fee **plus** a _hash_ of their secret random number  
   ```solidity
   bytes32 myHash = keccak256(abi.encodePacked(msg.sender, myRandom));
   lottery.purchaseTicket{value: 0.0007 ether}(myHash);
   ```

3. **Number reveal (reveal phase)**  
   When the purchase window closes, players reveal their number.  
   The contract verifies `keccak256(sender || number) == storedHash`.

4. **Winner selection**  
   Anyone can call `pickWinner()` once all numbers are revealed *or* the decide window elapses.  
   The contract XOR‑s all revealed numbers → `finalRandomNumber`  
   and chooses  
   ```solidity
   winnerIndex = finalRandomNumber % users.length;
   ```

5. **Prize claim**  
   The lucky address calls `claimPrize()` to withdraw the contract balance.

The commit‑reveal scheme protects against miners/admin bias and late revelations.

---

## 🗂️ Repository Layout

```text
Blockchain-Lottery-Seller/
├── Backend-Solidity/          # Remix workspace (optional)
│   └── verification_key.json  # Zero‑knowledge stub (unused)
├── Frontend-Angular/          # Angular 18 project
│   ├── src/contracts/lottery.sol   # Canonical contract
│   ├── src/abis.ts                 # ABI & contract address constants
│   └── src/services/contract.service.ts
└── README.md                  # you are here
```

---

## 🚀 Quick Start

### 0. Prerequisites
| Tool | Version | Notes |
|------|---------|-------|
| Node.js | ≥ 20.0 | LTS recommended |
| Angular CLI | 18.2.x | `npm i -g @angular/cli` |
| MetaMask | latest | Browser extension |
| **Optional** | Hardhat 2.20 / Foundry | for local network |

### 1. Clone & Install
```bash
git clone https://github.com/<your‑fork>/Blockchain-Lottery-Seller.git
cd Blockchain-Lottery-Seller/Frontend-Angular
npm install
```

### 2. Deploy the Contract (Remix)

1. Open **Remix** → *Solidity 0.8.x* compiler  
2. Load `frontend-angular/src/contracts/lottery.sol`  
3. Compile, then **Deploy** with e.g.  
   * `_purchaseDurationInDays` = 2  
   * `_decideDurationInDays`  = 1  
4. Copy the deployed address

> **Hardhat users:** `npx hardhat compile && npx hardhat run scripts/deploy.ts --network sepolia`

### 3. Configure the Front‑end
Edit `Frontend-Angular/src/abis.ts`:

```ts
export const uContract_address = "0xYOUR_DEPLOYED_ADDRESS";
export const uContract_abi = [ /* … shortened … */ ];
```

Optionally set your **Infura/Alchemy ID** in  
`src/services/contract.service.ts`.

### 4. Run the dApp
```bash
ng serve --open      # http://localhost:4200
```
Connect MetaMask → buy ticket → reveal → pick winner!

---

## 🧪 Tests

### Solidity (Remix)
Run the Remix `remix_tests.sol` script from **Backend‑Solidity/.deps**

### Angular
```bash
npm test          # Karma + Jasmine
npm run lint      # ESLint
```

---

## 🔒 Security Considerations
* **Re‑entrancy‑safe**: prize is sent via `transfer()` after state updates  
* Commit/reveal mitigates miner/front‑running manipulation  
* Contract includes basic admin check to prevent owner participation

See `audit.md` (coming soon) for a full threat model.

---

## 📓 API (public functions)

| Function | Description |
|----------|-------------|
| `purchaseTicket(bytes32 hash)` | Commit ticket & hash (payable) |
| `revealNumber(uint32 number)` | Reveal secret number |
| `pickWinner()` | Select winner (anyone can call) |
| `claimPrize()` | Winner withdraws balance |
| `amIWinner()` | Returns `true` if caller is the winner |
| `learnStage()` | Returns enum stage: *Purchase*, *Reveal*, *Closed* |

---

> *Made with 🎲, 👩‍💻 and ☕ – good luck & have fun!*  

