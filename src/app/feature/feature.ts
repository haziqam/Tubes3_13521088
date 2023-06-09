export abstract class Feature {
    /*
     * Executes feature and returns bot response.
     */
    abstract getResponse(): Promise<string> | string;
}