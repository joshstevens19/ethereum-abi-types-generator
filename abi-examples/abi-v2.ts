export interface MethodPayableReturnContext {
        send(tx: any): Promise<any>;
        estimateGas(tx: any): Promise<any>;
        encodeABI(): string;
    }export interface MethodConstantReturnContext<TCallReturn> {
        call(): Promise<TCallReturn>;
    }export interface MethodReturnContext extends MethodPayableReturnContext {}export interface CreateOfferRequest { ID: string;percentage: string;duration: string;revenueCalculationMethod: string;}export interface AffiliationsResponse { affiliate: string;offerID: string;creationTime: string;campaignID: string;}export interface GetAffiliationResponse { affiliate: string;percentage: string;revenueCalculationMethod: string;campaignID: string;offerID: string;}export interface OffersResponse { ID: string;percentage: string;duration: string;revenueCalculationMethod: string;}
      export interface FactoryAbi { 
        
         /**
            * Payable: false
            * Constant: false
            * StateMutability: nonpayable
            * Type: function 
          */
        acceptOwnership(): MethodReturnContext;
         /**
            * Payable: false
            * Constant: false
            * StateMutability: nonpayable
            * Type: function 
* @param _newOwner Type: address, Indexed: false
          */
        changeOwner(_newOwner: string): MethodReturnContext;
         /**
            * Payable: false
            * Constant: false
            * StateMutability: nonpayable
            * Type: function 
* @param o Type: tuple, Indexed: false
          */
        createOffer(o: CreateOfferRequest[]): MethodReturnContext;
         /**
            * Payable: false
            * Constant: false
            * StateMutability: nonpayable
            * Type: function 
* @param offerID Type: bytes32, Indexed: false
* @param affiliate Type: address, Indexed: false
* @param validation Type: bool, Indexed: false
          */
        setAffiliateValidation(offerID: string, affiliate: string, validation: boolean): MethodReturnContext;
         /**
            * Payable: false
            * Constant: false
            * StateMutability: nonpayable
            * Type: function 
* @param player Type: address, Indexed: false
* @param affiliate Type: address, Indexed: false
* @param offerID Type: bytes32, Indexed: false
* @param campaignID Type: bytes32, Indexed: false
          */
        setAffiliation(player: string, affiliate: string, offerID: string, campaignID: string): MethodReturnContext;
         /**
            * Payable: false
            * Constant: false
            * StateMutability: nonpayable
            * Type: function 
* @param a Type: address, Indexed: false
          */
        setApprovedOperatorsListAddress(a: string): MethodReturnContext;
         /**
            * Payable: false
            * Constant: true
            * StateMutability: view
            * Type: function 
* @param parameter0 Type: address, Indexed: false
* @param parameter1 Type: address, Indexed: false
          */
        affiliations(parameter0: string, parameter1: string): MethodConstantReturnContext<AffiliationsResponse>;
         /**
            * Payable: false
            * Constant: true
            * StateMutability: view
            * Type: function 
* @param parameter0 Type: address, Indexed: false
* @param parameter1 Type: bytes32, Indexed: false
* @param parameter2 Type: address, Indexed: false
          */
        affiliationValidations(parameter0: string, parameter1: string, parameter2: string): MethodConstantReturnContext<boolean>;
         /**
            * Payable: false
            * Constant: true
            * StateMutability: view
            * Type: function 
          */
        approvedOperatorsListAddress(): MethodConstantReturnContext<string>;
         /**
            * Payable: false
            * Constant: true
            * StateMutability: view
            * Type: function 
* @param player Type: address, Indexed: false
* @param operator Type: address, Indexed: false
          */
        getAffiliation(player: string, operator: string): MethodConstantReturnContext<GetAffiliationResponse>;
         /**
            * Payable: false
            * Constant: true
            * StateMutability: view
            * Type: function 
* @param parameter0 Type: bytes32, Indexed: false
          */
        offers(parameter0: string): MethodConstantReturnContext<OffersResponse>;
         /**
            * Payable: false
            * Constant: true
            * StateMutability: view
            * Type: function 
          */
        owner(): MethodConstantReturnContext<string>; }